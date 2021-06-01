Rails.application.routes.draw do
  post "signin", to: "auth#signin"
  post "register", to: "auth#register"
  post "refresh_token", to: "auth#refresh_token"
  # delete "signout", to: "users#signout"
  get "my_account", to: "users#my_account"

  post "messages", to: "messages#create"
end
