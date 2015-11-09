from redis import Redis
from random import random
from time import sleep

redis = Redis(host="jobdoer_redis_1", port=6379)

if __name__ == "__main__":
    while True:
        sleep(random())
        redis.incr('count')
