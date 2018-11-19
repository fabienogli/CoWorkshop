# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## The api-routes : 

| Prefix    | Verb  | URI Pattern               | Controller#Action |
| :---------: | :-----: | :-------------------------: | :-----------------: |
| tags      |  GET  |  /tags                    | tags#index |
|           | POST  | /tags                     | tags#create |
| tag       | GET   | /tags/:id                 | tags#show |
|           | PATCH | /tags/:id                 | tags#update |
|           | PUT   | /tags/:id                 | tags#update |
|           | DELETE| /tags/:id                 | tags#destroy |
| users     | GET   | /users                    | users#index |
|           | POST  | /users                    | users#create |
| user      | GET   | /users/:id                | users#show |
|           | PATCH | /users/:id                | users#update |
|           | PUT   | /users/:id                | users#update |
|           | DELETE| /users/:id                | users#destroy |
| works     | GET   | /works                    | works#index |
|           | POST  | /works                    | works#create |
| work      | GET   | /works/:id                | works#show |
|           | PATCH | /works/:id                | works#update |
|           | PUT   | /works/:id                | works#update |
|           | DELETE| /works/:id                | works#destroy |
|           | POST  | /users/:id/tags           | users#create_tags |
|           | DELETE| /users/:id/tags/:tag_id   | users#destroy_tags           |
|           | POST  | /works/:id/users          |works#bind_participants        |
|           | DELETE| /works/:id/users/:user_id | works#unbound_participants    |
|           | POST  | /works/:id/tags           | works#bind_tags               |
|           | DELETE| /works/:id/tags/:tag_id   | works#unbound_tags            |