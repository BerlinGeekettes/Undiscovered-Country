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

