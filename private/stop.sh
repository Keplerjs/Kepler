#!/bin/bash
PORT="3000"

kill -9 $(lsof -i :$PORT -t)
