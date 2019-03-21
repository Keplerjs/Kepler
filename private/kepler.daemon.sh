#!/bin/bash
#
### BEGIN INIT INFO
# Provides:             keplerd
# Required-Start:       $syslog $remote_fs mongodb nginx
# Required-Stop:        $syslog $remote_fs
# Should-Start:         $local_fs
# Should-Stop:          $local_fs
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Forever Demonizer with a low privilege user
# Description:          Forever Demonizer with a low privilege user
### END INIT INFO
#
# Copyright 2019 stefano.cudini@gmail.com
#
# NodeJs Forever Demonizer with a low privilege user, official code:
# 	https://gist.github.com/stefanocudini/6116527
#     
# Requirements:
# 	https://github.com/nodejitsu/forever
#   npm install -g forever
#
. /lib/lsb/init-functions

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

DAEMON_NAME="keplerd"
DAEMON_USER="kepler"
DAEMON_GROUP="kepler"

PORT=4000
BIND_IP=127.0.0.1
DOMAIN="app.kepler.com"

APPNAME="kepler"
APPFILE="/var/www/$APPNAME.bundle/bundle/main.js"
APPCONF="/var/www/$APPNAME.bundle/settings.json"

LOGDIR="/var/log/$APPNAME"
LOGERR="$LOGDIR/$APPNAME.err"
LOGOUT="$LOGDIR/$APPNAME.log"

export MONGO_URL="mongodb://localhost:27017/$APPNAME"
export MAIL_URL="smtp://localhost:25"
export METEOR_SETTINGS=`cat "$APPCONF"`
export ROOT_URL="http://$DOMAIN"
export BIND_IP=$BIND_IP
export PORT=$PORT

export NODE_PATH="/usr/lib/node_modules"
#NODE_OPTIONS="--debug --expose-gc --always-compact"
##optimize memory usage in NodeJs

FOREVER_DIR=$(bash <<< "dirname $APPFILE")"/.forever"
FOREVER_PID="$FOREVER_DIR/$APPNAME.pid"

DAEMON_PID="/var/run/$DAEMON_NAME.pid"
DAEMON_LOG="$LOGDIR/$DAEMON_NAME.log"
DAEMON_BIN="/usr/lib/node_modules/forever/bin/forever"

FOREVER_OPTS="--pidFile $FOREVER_PID -a -l $DAEMON_LOG "\
"-e $LOGERR -o $LOGOUT --minUptime 5000 --spinSleepTime 2000"

if [ ! -d "$FOREVER_DIR" ]; then
    echo "make dir: $FOREVER_DIR"
    mkdir -p "$FOREVER_DIR"
    chown $DAEMON_USER:$DAEMON_GROUP "$FOREVER_DIR"
    chmod 0770 "$FOREVER_DIR"
fi

if [ ! -d "$LOGDIR" ]; then
    echo "make dir: $LOGDIR"
    mkdir -p "$LOGDIR"
    chown $DAEMON_USER:$DAEMON_GROUP "$LOGDIR"
    chmod 0770 "$LOGDIR"
fi

start() {
    echo "Starting $DAEMON_NAME as user: $DAEMON_USER"
    su $DAEMON_USER -c "$DAEMON_BIN start $FOREVER_OPTS $APPFILE"
    echo $! > $DAEMON_PID

    RETVAL=$?
}

stop() {
    if [ -f $DAEMON_PID ]; then
        echo "Shutting down $DAEMON_NAME"
        su $DAEMON_USER -c "$DAEMON_BIN stop $FOREVER_OPTS $APPFILE"
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
    reload)
        restart
        ;;
    *)
        echo "Usage: {start|stop|status|restart|reload}"
        exit 1
        ;;
esac
exit $RETVAL
