FROM python:2.7
RUN pip install redis
ADD . /code
WORKDIR /code
CMD ["python", "worker.py"]
