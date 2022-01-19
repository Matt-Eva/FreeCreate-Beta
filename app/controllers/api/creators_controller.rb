class Api::CreatorsController < ApplicationController

    def create
        creator = current_user.creators.create!(creator_params)
        render json: creator, status: :created
    end

    def update
        creator = Creator.find(params[:id])
        creator.update!(creator_params)
        render json: creator, status: :accepted
    end

    def destroy
        creator = Creator.find(params[:id])
        creator.destroy
        head :no_content
    end

    def my_creations
        creator = Creator.find(params[:id])
        writings = creator.writings
        arts = creator.arts
        videos = creator.videos
        audios = creator.audios
        creations = {writings: writings, arts: arts, videos: videos, audios: audios}
        render json: creations, status: :ok
    end

    private 

    def creator_params
        params.permit(:name, :is_writer, :is_artist, :is_audio, :is_video, :prof_pic, :payment_info)
    end
end
