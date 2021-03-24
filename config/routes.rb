Rails.application.routes.draw do

  devise_for :users
  root to: 'levels#index'

  resources :messages, only: [:index, :show, :new, :create]
  resources :levels, only: [:index, :show]
  resources :quests, only: [:index, :show]
  resources :team_quest_links, only: [:index]
  resources :votes, only: [:index, :new, :create]

  resources :users, only: [:index, :show, :edit, :update], shallow: true do

    resources :polls, only: [:show, :new, :create, :edit, :update, :delete], shallow: true do
      resources :poll_user_links, only: [:index, :show, :new, :create]
    end
    resources :roles, only: [:index, :show]


    resources :tags, only: [:index]
    resources :user_role_links, only: [:index, :show]
  end

  resources :teams, only: [:index, :show]

  resources :tinder_quests, only: [:index]

  get '/tim_tests', to: 'pages#tim_tests'
end
