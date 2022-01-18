class Api::AudiosController < ApplicationController


    def index
        audios = Audio.all.slice(0, 51)
        render json: audios, status: :ok
    end

    def create
        audio = Audio.create!(audio_params)
        render json: audio, status: :created
    end

    private
    
    def audio_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
    
end
