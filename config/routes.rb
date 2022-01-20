Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    get "/me", to: "users#show"
    post "/signup", to: "users#create"
    get "/mycreations/:id", to: "creators#my_creations"
    post "/search/writings", to: "writings#search_query"
    post "/search/audios", to: "audios#search_query"
    post "/search/arts", to: "arts#search_query"
    post "/search/videos", to: "videos#search_query"
    post "/filter/videos", to: "videos#filter_query"
    post "/filter/arts", to: "arts#filter_query"
    post "/filter/writings", to: "writings#filter_query"
    post "/filter/audios", to: "audios#filter_query"
    resources :creators
    resources :writings
    resources :arts
    resources :videos
    resources :audios
    resources :tags
    resources :writ_taglinks
    resources :art_taglinks
    resources :vid_taglinks
    resources :aud_taglinks
  end
  
  post "/login", to: "sessions#create"
  post "/cloudinary/thumbnail/destroy", to: "assets#destroy_thumbnail"
  post "/cloudinary/audio/destroy", to: "assets#destroy_audio"
  post "/cloudinary/video/destroy", to: "assets#destroy_video"
  post "/cloudinary/art/destroy", to: "assets#destroy_art"
  post "/allcreations/search", to: "application#search_all"
  post "/allcreations/filter", to: "application#filter_all"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
