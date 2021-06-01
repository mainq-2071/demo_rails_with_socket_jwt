class AuthController < ApplicationController
  skip_before_action :authorized

  def register
    user = User.create(user_params)
    if user.valid?
      render json: {
        user: UserSerializer.new(user),
        auth: user.generate_auth
      }
    else
      render json: {error: "Invalid username or password"}
    end
  end

  def signin
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      render json: {
        user: UserSerializer.new(user),
        auth: user.generate_auth
      }
    else
      render json: {error: "Invalid email or password."}, status: :unprocessable_entity
    end
  end

  def refresh_token
    refresh_token = UserRefreshToken.find_by refresh_token: params[:refresh_token]
    if refresh_token
      user = User.find refresh_token.user_id
      render json: {
        auth: user.generate_auth
      }
    else
      render json: {error: "refresh_token_fail."}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :email)
  end
end
