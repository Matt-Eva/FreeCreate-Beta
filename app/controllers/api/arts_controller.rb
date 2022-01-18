class Api::ArtsController < ApplicationController

    def create
        art = Art.create!(art_params)
        render json: art, status: :created
    end

    private
    
    def art_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
