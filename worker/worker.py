from redis import Redis
from primes import getPrime

redis = Redis(host="redis", port=6379)

if __name__ == "__main__":
    while True:
        getPrime(256)
        redis.incr('count')
