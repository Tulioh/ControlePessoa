#!/bin/sh

DOCKER_IMAGE_NAME="controle_pessoa/app"
WORK_DIR="/home/tulio"

docker stop $(docker ps | grep $DOCKER_IMAGE_NAME | awk '{print $1}')

docker build -t $DOCKER_IMAGE_NAME .

docker run -p 3000:3000 -d -v `pwd`:$WORK_DIR $DOCKER_IMAGE_NAME 
