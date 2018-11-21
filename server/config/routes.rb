Rails.application.routes.draw do
  match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]
  post 'login' => 'user_token#create'
  resources :tags, :users, :works
  post '/users/:id/tags', to: 'users#create_tags'
  delete '/users/:id/tags/:tag_id', to: 'users#destroy_tags'
  post    '/works/:id/users', to: 'works#bind_participants'
  delete  '/works/:id/users/:user_id', to: 'works#unbound_participants'
  post    '/works/:id/tags', to: 'works#bind_tags'
  delete  '/works/:id/tags/:tag_id', to: 'works#unbound_tags'
end
