class Api::AudiosController < ApplicationController


    def index
        audios = Audio.all.slice(0, 51)
        render json: audios, include: ['creator', 'creator.user'], status: :ok
    end

    def show
        audio = Audio.find(params[:id])
        render json: audio, status: :ok
    end

    def create
        audio = Audio.create!(audio_params)
        render json: audio, status: :created
    end

    def update
        audio = Audio.find(params[:id])
        audio.update!(audio_params)
        render json: audio, status: :accepted
    end

    def destroy
        audio = Audio.find(params[:id])
        audio.destroy
        head :no_content
    end

    def search_query
        audios = Audio.where(title: params[:search])
        render json: audios, status: :ok
    end

    def filter_query
        tag = Tag.find_by(tag: params[:tag])
        if !tag
            render json: {message: "That filter produced no results"}, status: :not_found
        else
            audios = tag.audios
            render json: audios, status: :ok
        end
    end

    private
    
    def audio_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id, :rank)
    end
    
end
