class Api::CreatorsController < ApplicationController

    def create
        creator = current_user.creators.create!(creator_params)
        render json: creator, status: :created
    end

    private 

    def creator_params
        params.permit(:name, :is_writer, :is_artist, :is_audio, :is_video, :prof_pic, :payment_info)
    end
end
