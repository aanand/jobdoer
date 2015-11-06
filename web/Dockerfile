FROM python:3.4
RUN pip install flask redis
ADD . /code
WORKDIR /code
CMD ["python", "app.py"]
