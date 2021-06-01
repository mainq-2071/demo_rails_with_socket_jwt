class UsersController < ApplicationController
  before_action :authorized, only: [:my_account]

  def my_account
    render json: {
      user: UserSerializer.new(current_user)
    }
  end
end
