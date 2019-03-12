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

if [ $MYIP = '127.0.1.1' ]; then
	echo "START DEVELOPMENT MODE"
	export ROOT_URL="http://$DOMAINDEV"
	meteor --port $PORT --settings $SETS
else
	echo "START PRODUTION MODE"
	export ROOT_URL="http://$DOMAINPRO"
	meteor --port $PORT --settings $SETS --production
fi
