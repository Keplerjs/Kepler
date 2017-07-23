#!/bin/bash
#install libv8-2.2.24

LOG="app.log"
ERR="app.err"
PID="app.pid"
OPTS="--raw-logs"
SETS="settings.json"
#OPTS="$OPTS --release blaze-rc1"
#DOMAINDEV=$( grep domaindev settings.json | cut -d'"' -f4)
#DOMAINPRO=$( grep domain settings.json | cut -d'"' -f4)
DOMAINDEV="climbo.local"
DOMAINPRO="climbo.net"
DBNAME="climbo"


MYIP=$( hostname -i | cut -f1 -d' ')
export MONGO_URL="mongodb://localhost:27017/$DBNAME"
export PORT=8800
#export NODE_OPTIONS='--debug'

if [ $MYIP = '127.0.1.1' ]; then
	echo "START DEVELOPMENT MODE"
	export ROOT_URL="http://$DOMAINDEV:$PORT"
	meteor --port $PORT --settings $SETS
#	meteor --port $PORT --production --settings $SETS
else
	echo "START PRODUTION MODE"
	export ROOT_URL="http://$DOMAINPRO"
	meteor --port $PORT --production --settings $SETS
#	meteor --port $PORT --settings $SETS
fi
echo $! > $PID
