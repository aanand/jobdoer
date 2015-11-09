from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host="jobdoer_redis_1", port=6379)

@app.route('/')
def home():
    return open('static/index.html').read()

@app.route('/count')
def count():
    return str(int(redis.get('count') or 0))

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
