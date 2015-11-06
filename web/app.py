from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host="redis", port=6379)

@app.route('/')
def home():
    return open('static/index.html').read()

@app.route('/count')
def count():
    return str(redis.llen('primes'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
