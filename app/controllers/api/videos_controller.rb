class Api::VideosController < ApplicationController

    def index
        videos = Video.all.slice(0, 51)
        render json: videos, status: :ok
    end
    
    def show
        video = Video.find(params[:id])
        render json: video, status: :ok
    end

    def create
        video = Video.create!(video_params)
        render json: video, status: :created
    end

    private
    
    def video_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
