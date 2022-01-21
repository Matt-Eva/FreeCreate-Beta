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
        render json: creator, include: ['writings', 'writings.writ_taglinks', 'audios', 'audios.aud_taglinks', 'videos', 'videos.vid_taglinks', 'arts', 'arts.art_taglinks'], status: :ok
    end

    private 

    def creator_params
        params.permit(:name, :is_writer, :is_artist, :is_audio, :is_video, :prof_pic, :payment_info)
    end
end
