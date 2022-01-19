class Api::VideosController < ApplicationController

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

    private
    
    def video_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
