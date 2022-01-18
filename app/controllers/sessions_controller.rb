class SessionsController < ApplicationController

    before_action :authorize, only: [:destroy]

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        elsif user == nil
            render json: {errors: ["Username not found."]}, status: :not_found
        else
            render json: {errors: ["Invalid password."]}, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id] !=nil
            session.delete :user_id
            head :no_content
        else
            render json: {errors: "Not authorized"}, status: :unauthorized
        end
    end

end
