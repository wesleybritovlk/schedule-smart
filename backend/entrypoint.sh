#!/bin/sh

mkdir -p .secrets

if [ ! -f ".secrets/private.pem" ]; then
    openssl genrsa -out .secrets/private.pem 2048
fi

if [ ! -f ".secrets/public.pem" ]; then
    openssl rsa -in .secrets/private.pem -pubout -out .secrets/public.pem
fi

exec java -jar app.jar
