class ApplicationController < ActionController::API
    include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :unprocessable
rescue_from ActiveRecord::RecordNotFound, with: :not_found

def search_all
    writing = Writing.where(title: params[:search]).sort_by{|a| -(a.ranking)}.slice(0, 51)
    audio = Audio.where(title: params[:search])
    art = Art.where(title: params[:search])
    video = Video.where(title: params[:search])
    creations = {video: video, art: art, audio: audio, writing: writing}
    render json: creations, status: :ok
end

def filter_all
    tag = Tag.find_by(tag: params[:tag])
    if !tag
        render json: {message: "That tag produced no results"}, status: :not_found
    else
        writing = tag.writings.sort_by{|a| -(a.rank)}.slice(0, 51)
        art = tag.arts
        video = tag.videos
        audio = tag.audios.sort_by{|a| -(a.rank)}.slice(0, 51)
        creations = {writing: writing, art: art, video: video, audio: audio}
        render json: creations, status: :ok
    end
end

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

def current_user
    @current_user ||=User.find_by(id: session[:user_id])
end
    
end
