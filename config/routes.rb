Rails.application.routes.draw do
  root 'home#index'
  resources :home do
    resources :trails do
      resources :comments
    end
  end
  resources :sessions
end
