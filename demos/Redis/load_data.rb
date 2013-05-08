#!/usr/bin/env ruby
# encoding: utf-8
#source: http://www.infochimps.com/datasets/delicious-bookmarks-september-2009

require 'rubygems'
require 'json'
require "redis"

KEY_PREFIX   = "delicious"
KEY_ALL_TAGS = "delicious:all"
SCORE        = 1.0

unless ARGV.length == 1
  puts "Usage: ruby load_data.rb InputFile.tsv \n"
  exit
end

def key(tag)
  KEY_PREFIX + ":" + tag
end

redis    = Redis.new
filename = ARGV[0]
start    = Time.now
lines    = 0

File.open(filename).each_line do |line|
  lines += 1
  jsonObject = JSON.parse line
  
  if jsonObject["tags"]
    tags = jsonObject["tags"].map {|tag| tag["term"] }
    
    tags.each do |tag|
      redis.zincrby KEY_ALL_TAGS, SCORE, tag
      
      (tags - [tag]).each do |neighbor|
        redis.zincrby key(tag), SCORE, neighbor 
      end
    end
  end
  
  puts "#{lines} lines loaded." if lines % 10000 == 0
end

puts "Data loaded in #{Time.now - start}s, lines: #{lines}."
