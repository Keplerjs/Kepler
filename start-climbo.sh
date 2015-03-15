#!/bin/bash
#installare libv8-2.2.24
#installare meteorite con npm (https://npmjs.org/):
#sudo -H npm install -g meteorite
#https://github.com/oortcloud/meteorite#permission-woes
LOG=climbo.log
ERR=climbo.err
PID=climbo.pid
OPTS="--raw-logs"

#--release blaze-rc1"
MYIP=$( hostname -i | cut -f1 -d' ')
export MONGO_URL=mongodb://localhost:27017/climbo
export PORT=8800
#export NODE_OPTIONS='--debug'

if [ $MYIP = '127.0.0.1' ]; then
	echo $MYIP
	export ROOT_URL="http://climbo.local:$PORT"
	#mrt run --port $PORT $OPTS --settings settings.json
	meteor --port $PORT --production --settings settings.json
#	mrt run --port $PORT $OPTS --settings settings.json --production
else
	export ROOT_URL="http://climbo.net"
	#mrt run --port $PORT $OPTS --production --settings settings.json
	meteor --port $PORT --production --settings settings.json
#	mrt run --port $PORT --settings settings.json
# 2>&1 > $LOG &
#--raw-logs 2> $ERR 1> $LOG &
fi
echo $! > $PID

#tail -f $LOG

#manuale
#PORT=8000 MONGO_URL=mongodb://localhost:27017/climbo_meteor ROOT_URL=http://climbo.net/ node bundle/main.js
#PORT=8000 MONGO_URL="mongodb://localhost:27017/climbo_meteor" ROOT_URL="http://91.121.205.105:8000/" mrt

#http://julien-c.fr/2012/10/meteor-amazon-ec2/

#per debuggare usare
# node-inspector
#http://flaviocopes.com/node-inspector-debug-node-js/
# Client-side you have the console. For server-side debugging, use node-inspector and make sure you have meteor v0.5.3, which makes things easier thanks to support for NODE_OPTIONS:
# Install node-inspector: 'npm install -g node-inspector'
# Start meteor: NODE_OPTIONS='--debug' mrt run
# Start node-inspector
# Go to the URL given by node-inspector in Chrome
# Debug at will
