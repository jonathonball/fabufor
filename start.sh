#!/bin/bash

#if [ ! -z $1]
#npm start -- "$1";

if [[ -z $1 ]]; then
    npm start;
else
    npm start -- "$@";
fi;
