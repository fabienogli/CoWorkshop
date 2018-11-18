#!/bin/bash
while ! curl http://db:5432/ 2>&1 | grep '52'
do
  sleep 1
done
rails db:create
rails db:migrate RAILS_ENV=development
exec "$@"