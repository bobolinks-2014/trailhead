Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root 'home#index'
  resources :trails do
    resources :comments
    resources :photos
  end
  resources :sessions
  resources :users
  get '/more_comments', to: 'trails#more_comments'
  get '/logout', to: 'sessions#destroy'
end
