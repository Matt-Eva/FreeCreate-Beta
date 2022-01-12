class ApplicationController < ActionController::API
    include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :unprocessable
rescue_from ActiveRecord::RecordNotFound, with: :not_found

private

def authorize
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
end

def unprocessable invalid
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
end

def not_found exception
    render json: {errors: "#{exception.model} not found"}, status: :not_found
end
    
end
