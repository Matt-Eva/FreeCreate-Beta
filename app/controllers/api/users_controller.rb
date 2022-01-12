class Api::UsersController < ApplicationController
before_action :authorize
skip_before_action :authorize, only: [:create]

    def show
        render json: current_user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :nickname, :password, :password_confirmation, :email, :prof_pic)
    end
end
