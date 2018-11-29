#!/bin/bash
cd /webapp
echo "dans l'entrypoint"
ls -al
yarn install
exec "$@"
