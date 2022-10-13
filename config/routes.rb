Rails.application.routes.draw do
  
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :videos, only: [:index, :show, :create]
  end

  get '*path', to: "static_pages#frontend_index"

end
