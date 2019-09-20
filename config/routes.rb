Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/challenges/:keyname', to: 'challenges#show' 
  put '/challenges/:keyname', to: 'challenges#update' 
  get '/challenges/:unique/play', to: 'challenges#play' 
end
