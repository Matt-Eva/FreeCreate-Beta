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

    def search_query
        videos = Video.where(title: params[:search])
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

    private
    
    def video_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
