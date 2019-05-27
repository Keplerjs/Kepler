#!/bin/bash

# copy this file in KeplerJs root path and run by user ./start.sh

# example of script launcher for bash
# more docs for ENV VARS here:
# https://docs.meteor.com/environment-variables.html

OPTS="--raw-logs"
#OPTS="$OPTS --release blaze-rc1"
DOMAINDEV="app.kepler.local"
DOMAINPRO="app.kepler.com"
DBNAME="kepler"
SETS="settings.json"
PORT="127.0.0.1:3000"
#TODO UNIX_SOCKET_PATH

MYIP=$( hostname -i | cut -f1 -d' ')
export MONGO_URL="mongodb://localhost:27017/$DBNAME"
export MAIL_URL="smtp://localhost:25"

#TOP previous instance
if [ -f kepler.pid ]
then kill -9 `cat kepler.pid`
fi

#ARCHIVE previous logs
if [ -f kepler.log ]
then mv kepler.log kepler_$(date +%Y%m%d%M%H%S).log
fi
touch kepler.log kepler.pid
chmod 0700 kepler.log

#RUN Kepler in background
meteor --port $PORT --settings $SETS --production > kepler.log 2>&1 &
echo $! > kepler.pid
