Rails.application.routes.draw do
  resources :tags, :users, :works
  post '/users/:id/tags', to: 'users#create_tags'
  delete '/users/:id/tags/:tag_id', to: 'users#destroy_tags'
end
