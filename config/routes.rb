Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    get "/me", to: "users#show"
    post "/signup", to: "users#create"

    get "/mycreations/:id", to: "creators#my_creations"

    get "/libwrit", to: "writings#lib_writing"
    get "/libaud", to: "audios#lib_audio"
    get "/libart", to: "arts#lib_art"
    get "/libvid", to: "videos#lib_video"
    
    get "/listwrit", to: "writings#list_writing"
    get "/listaud", to: "audios#list_audio"
    get "/listart", to: "arts#list_art"
    get "/listvid", to: "videos#list_video"

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

    resources :writ_likes
    resources :art_likes
    resources :vid_likes
    resources :aud_likes
    
    resources :writ_lib_items
    resources :art_lib_items
    resources :vid_lib_items
    resources :aud_lib_items

    resources :writ_list_items
    resources :art_list_items
    resources :vid_list_items
    resources :aud_list_items
  end
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/cloudinary/thumbnail/destroy", to: "assets#destroy_thumbnail"
  post "/cloudinary/audio/destroy", to: "assets#destroy_audio"
  post "/cloudinary/video/destroy", to: "assets#destroy_video"
  post "/cloudinary/art/destroy", to: "assets#destroy_art"

  get "/alllikedcreations", to: "application#all_liked_creations"
  get "/alllibcreations", to: "application#all_lib_creations"
  get "/alllistcreations", to: "application#all_list_creations"
  get "/allcreations", to: "application#all_creations"

  post "/allcreations/search", to: "application#search_all"
  post "/allcreations/filter", to: "application#filter_all"
  

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
