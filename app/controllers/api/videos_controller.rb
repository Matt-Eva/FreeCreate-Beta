class Api::VideosController < ApplicationController

    def create
        video = Video.create!(video_params)
        render json: video, status: :created
    end

    private
    
    def video_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
