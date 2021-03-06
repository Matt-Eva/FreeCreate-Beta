class Api::VideosController < ApplicationController

    before_action :authorize, only: [:create, :update, :destroy, :lib_video]

    def index
        videos = Video.all.slice(0, 51)
        render json: videos, include: ['creator', 'creator.user'], status: :ok
    end
    
    def show
        video = Video.find(params[:id])
        render json: video, status: :ok
    end

    def create
        video = Video.create!(video_params)
        render json: video, status: :created
    end

    def update
        video = Video.find(params[:id])
        video.update!(video_params)
        render json: video, status: :accepted
    end

    def destroy
        video = Video.find(params[:id])
        video.destroy
        head :no_content
    end

    def search_query
        videos = Video.where("title LIKE ?", "%#{params[:search]}%")
        render json: videos, status: :ok
    end

    def filter_query
        tag = Tag.find_by(tag: params[:tag])
        if !tag
            render json: {message: "That filter produced no results"}, status: :not_found
        else
            videos = tag.videos
            render json: videos, status: :ok
        end
    end

    def lib_video
        user = current_user
        video = user.lib_vids
        render json: {vid: video}, status: :ok
    end

    def list_video
        user = current_user
        video = user.list_vids
        render json: {vid: video}, status: :ok
    end

    private
    
    def video_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id, :rank)
    end
end
