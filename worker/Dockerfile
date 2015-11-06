FROM python:3.4
RUN pip install redis
ADD . /code
WORKDIR /code
CMD ["python", "worker.py"]
