FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;

RUN apt-get update;
RUN apt-get install -y python3.8;

RUN apt-get install -y python3-pip;

run apt-get install -y sed && \
    apt-get clean;

RUN apt update && \
    apt install -y unixodbc && \
    apt clean;

RUN apt-get -y install libgloox-dev;

RUN apt install -y python3.8-tk;

RUN apt install -y python-is-python3;

RUN apt-get -y install time;

RUN apt -y install gawk;

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

WORKDIR /usr/local/lib/python3.8/dist-packages/pm4py/visualization/common

RUN sed -i 's/from graphviz.dot import Digraph/from graphviz import Digraph/g' gview.py

WORKDIR /app

COPY . .

EXPOSE 7778

WORKDIR /app/api

CMD [ "python3", "backend.py", "--host=0.0.0.0", "--port=7778"]
