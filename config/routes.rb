Rails.application.routes.draw do
  root 'home#index'
  resources :trails do
    resources :comments
    resources :photos
  end
  resources :sessions
  resources :users
  get '/logout', to: 'sessions#destroy'
end
