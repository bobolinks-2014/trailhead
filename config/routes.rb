Rails.application.routes.draw do
  root 'home#index'
  resources :home do
    resources :trail do
      resources :comments
    end
  end
  resources :sessions
end