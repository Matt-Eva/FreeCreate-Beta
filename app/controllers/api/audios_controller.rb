class Api::AudiosController < ApplicationController

    before_action :authorize, only: [:create, :update, :destroy, :lib_audio]

    def index
        audios = Audio.all.sort_by{|a| -(a.rank)}.slice(0, 51)
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
            audios = tag.audios.sort_by{|a| -(a.rank)}.slice(0, 51)
            render json: audios, status: :ok
        end
    end

    def lib_audio
        user = current_user
        audio = user.lib_auds
        render json: {audio: audio}, status: :ok
    end

    private
    
    def audio_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id, :rank)
    end
    
end
