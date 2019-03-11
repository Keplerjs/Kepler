#!/bin/bash
#
### BEGIN INIT INFO
# Provides:             keplerjs_daemon
# Required-Start:       $syslog $remote_fs
# Required-Stop:        $syslog $remote_fs
# Should-Start:         $local_fs
# Should-Stop:          $local_fs
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Forever Demonizer with a low privilege user
# Description:          Forever Demonizer with a low privilege user
### END INIT INFO
#
# Copyright 2014 stefano.cudini@gmail.com
#
# NodeJs Forever Demonizer with a low privilege user, official code:
# 	https://gist.github.com/stefanocudini/6116527
# Requirements:
# 	https://github.com/nodejitsu/forever
#
. /lib/lsb/init-functions

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

VERSION="app"
PORT=3000
BIND_IP=127.0.0.1
DOMAIN="app_meteor.net"
#app,  beta, admin, adv
#3000, 3001, 3002,  3003

APPNAME="app_meteor_$VERSION"
APPFILE="/var/www/$VERSION.bundle/main.js"
APPCONF="/var/www/$VERSION$DOMAIN/settings.json"

LOGDIR="/var/log/app_meteor"
LOGERR="$LOGDIR/$VERSION.err"
LOGOUT="$LOGDIR/$VERSION.log"

NODE_BIN_DIR="/opt/node/bin"
export NODE_PATH="/opt/node/lib/node_modules"

#NODE_OPTIONS="--debug --expose-gc --always-compact"
#ottimizza utilizzo ram su NodeJs

export MONGO_URL="mongodb://localhost:27017/$APPNAME"
export METEOR_SETTINGS=`cat "$APPCONF"`
export ROOT_URL="http://$VERSION$DOMAIN"
export BIND_IP=$BIND_IP
export PORT=$PORT

DAEMON_NAME="daemon_$APPNAME"
DAEMON_USER=meteor
DAEMON_GROUP=meteor

FOREVER_DIR=$(bash <<< "echo ~$DAEMON_USER")"/.forever"
FOREVER_PID="$FOREVER_DIR/$APPNAME.pid"

DAEMON_PID="/var/run/$DAEMON_NAME.pid"
DAEMON_LOG="$LOGDIR/$DAEMON_NAME.log"
DAEMON_BIN=$(readlink -f $NODE_BIN_DIR/forever)

FOREVER_OPTS="--pidFile $FOREVER_PID -a -l $DAEMON_LOG "\
"-e $LOGERR -o $LOGOUT --minUptime 5000 --spinSleepTime 2000 start $APPFILE "

#exit 0

if [ ! -d "$FOREVER_DIR" ]; then
    echo "make dir: $FOREVER_DIR"
    mkdir -p "$FOREVER_DIR"
    chown $DAEMON_USER:$DAEMON_GROUP "$FOREVER_DIR"
    chmod 0775 "$FOREVER_DIR"
fi

if [ ! -d "/var/log/$DAEMON_NAME" ]; then
    echo "make dir: /var/log/$DAEMON_NAME"
    mkdir -p "/var/log/$DAEMON_NAME"
    chown $DAEMON_USER:$DAEMON_GROUP "/var/log/$DAEMON_NAME"
    chmod 0750 "/var/log/$DAEMON_NAME"
fi

start() {
	echo "Starting $DAEMON_NAME as user: $DAEMON_USER"
    su $DAEMON_USER -c "$DAEMON_BIN $FOREVER_OPTS"
    echo $! > $DAEMON_PID

    RETVAL=$?
}

stop() {
    if [ -f $DAEMON_PID ]; then
		echo "Shutting down $DAEMON_NAME"
        su $DAEMON_USER -c "$DAEMON_BIN stop $APPFILE"
        rm -f $DAEMON_PID $FOREVER_PID

        RETVAL=$?
    else
		echo "$DAEMON_NAME is not running."
		RETVAL=0
    fi
}

restart() {
    echo "Restarting $DAEMON_NAME"
    stop
	sleep 3
    start
}

status() {
    echo "Status for $DAEMON_NAME:"
    su - $DAEMON_USER -c "$DAEMON_BIN list"

	tail -n30 $DAEMON_LOG

    RETVAL=$?
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage: {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL
