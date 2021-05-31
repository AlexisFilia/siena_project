Rails.application.routes.draw do

  devise_for :users
  # root to: 'levels#index'
  root to: 'pages#home'
  get '/contact', to: 'pages#contact'

  resources :teams, only: [:index, :show]

  resources :messages, only: [:index, :create]

  resources :media, only: [:show, :create, :destroy]

  resources :levels, only: [:index, :show], shallow: true do
    resources :quests, only: [:index, :show]
  end

  resources :team_quest_links, only: [:index, :update]
  resources :votes, only: [:index, :new, :create]

  resources :polls, only: [:show, :new, :create, :edit, :update, :delete], shallow: true do
    resources :poll_user_links, only: [:index, :show, :new, :create]
  end

  resources :users, only: [:index, :show, :edit, :update], shallow: true do
    resources :roles, only: [:index, :show]
    resources :tags, only: [:index]
    resources :user_role_links, only: [:index, :show]
  end



  resources :tinder_quests, only: [:index]

  get '/tim_tests', to: 'pages#tim_tests'

  # API CALLS
  post '/fetch_team_quest_link_content_for_modals', to: 'team_quest_links#fetch_team_quest_link_content_for_modals'
  post '/handle_roulette_result', to: 'roulettes#handle_roulette_result'
  post '/swipe_vote', to: 'votes#swipe_vote'
  get '/load_more_messages', to: 'messages#load_more_messages'
end
