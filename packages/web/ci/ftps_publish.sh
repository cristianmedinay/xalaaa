#!/usr/bin/env bash
set -e
set -x

USER=$1
PASSWORD=$2
HOST=$3
SOURCE_DIR=$4
TARGET_DIR=$5

cp ./.lftprc ~/.lftprc
lftp -c "open -u $USER,$PASSWORD $HOST;mirror -R -e $SOURCE_DIR $TARGET_DIR;"
