Redis Demo
=====================================

Redis for recommendation
-------------------------------------

Demo shows how redis can be used to implement collaborative filtering.
Redis is a NoSQL DB that is well suited for high read and write accesses.
E.g. useful to do realtime updates on counters for popular twitter tags.

Here we show how a sparse matrix for collaborative filtering can be
implemented with redis. The underlying dataset for the demo is a rss
feed of bookmarks from delicious.com. Redis is used to store the 
combinations of tags that were added to bookmarks. Based on the data
stored in redis recommendations for related tags can be made.

The demo shows a simplified scenario and demonstrates the power of 
sorted sets in redis.


**Redis:**

* http://redis.io/
* http://redis.googlecode.com/files/redis-2.6.13.tar.gz

**Gems:**

* https://github.com/redis/redis-rb

**Dataset:**

* http://www.infochimps.com/datasets/delicious-bookmarks-september-2009

Walkthrough
-------------------------------------

	1. Download and compile redis
	Redis is well suited for high read and write rates and when small data 
	losses can be accepted. Data is kept in-memory but redis also provides
	different persistence models.

	PREPARED:
	> wget http://redis.googlecode.com/files/redis-2.6.13.tar.gz
	> tar xzf redis-2.6.13.tar.gz
	> cd redis-2.6.13
	> make

	2. Install the Ruby gems (I use ruby-1.9.3)

	PREPARED:
	> gem install redis

	3. Start redis server

	> redis-server # will listen on port 6379 

	4. Start redis shell

	> redis-cli

	5. Simple redis commands

	redis> SET title "redis"
	redis> GET title
	redis> DEL title

	6. Recommendations using sorted sets
	
	List of commands on sorted sets:
	http://redis.io/commands#sorted_set

	PREPARED:
	Download from http://www.infochimps.com/datasets/delicious-bookmarks-september-2009
	Contains 10 days data from delicious.com. 
	We use it to find popular tag combinations.

	Add elements to the demo:photography set
	redis> ZINCRBY demo:photography 1 design
	redis> ZINCRBY demo:photography 1 award
	redis> ZINCRBY demo:photography 1 design

	Query elements by their score in reverse order, starts with the highest score
	redis> ZREVRANGE demo:photography 0 10

	Load data into redis.
	PREPARED:
	> ruby load_delicious_data.rb data/delicious-rss # (~1250000 lines)
	For every tag it stores a sorted set of related tags. Scores reflect the number of
	times a pair of tags has been combined.

	The matrix for the tag combinations forms a sparse matrix and can be represented 
	with sorted sets. For each tag we store a sorted set of tags that were combined 
	with it. Scores of the sorted set reflect the number of combinations.
	(No optimizations here, simplest approach as possible)

	Check number of keys and memory usage: 
	redis> INFO

	Find 10 most popular tags:
	redis> ZREVRANGE "delicious:all" 0 9 WITHSCORES

	Find rank of ufo:
	redis> ZREVRANK delicious:all ufo

	How often used:
	redis> ZSCORE delicious:all ufo

	List all tags that have been combined with "ufo" sorted by popularity
	redis> ZREVRANGE "delicious:ufo" 0 -1 WITHSCORES

	10 most popular tags combined with ufo
	redis> ZREVRANGE "delicious:ufo" 0 9 WITHSCORES