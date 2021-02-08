#!/bin/bash

ContainerName=$(docker run --user root -d -v ~/src/work:/home/jovyan/work -e GRANT_SUDO=yes -e CHOWN_HOME=yes -e CHOWN_HOME_OPTS='-R' -p 8889:8888 jupyter/datascience-notebook start-notebook.sh --NotebookApp.token='')
# docker run --user root -v new-longhorn-volume:/home/jovyan -e CHOWN_HOME=yes -e CHOWN_HOME_OPTS='-R' -it --rm -p 8888:8888 jupyter/datascience-notebook:latest
docker cp C:\Users\DaveBabbitt\Documents\Repositories\vault-2021\cpd-pdf-demo $ContainerName:/home/jovyan
docker exec -it $ContainerName conda init bash