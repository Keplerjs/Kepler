#!/bin/bash
#install libv8-2.2.24

LOG=climbo.log
ERR=climbo.err
PID=climbo.pid
OPTS="--raw-logs"
#OPTS="$OPTS --release blaze-rc1"

MYIP=$( hostname -i | cut -f1 -d' ')
export MONGO_URL=mongodb://localhost:27017/climbo
export PORT=9900
#export NODE_OPTIONS='--debug'

if [ $MYIP = '127.0.1.1' ]; then
	echo "START DEV MODE"
	export ROOT_URL="http://climbo.local:$PORT"
	meteor --port $PORT --settings settings.json
#	meteor --port $PORT --production --settings settings.json
else
	echo "START PROD MODE"
	export ROOT_URL="http://climbo.net"
#	meteor --port $PORT --production --settings settings.json
	meteor --port $PORT --settings settings.json
# 2>&1 > $LOG &
#--raw-logs 2> $ERR 1> $LOG &
fi
echo $! > $PID
