Rails.application.routes.draw do
  root '/'
  resources :trails do
     resources :comments
  end
  resources :sessions
end
