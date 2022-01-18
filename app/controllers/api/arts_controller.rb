class Api::ArtsController < ApplicationController

    def index
        art = Art.all.slice(0, 51)
        render json: art, status: :ok
    end

    def create
        art = Art.create!(art_params)
        render json: art, status: :created
    end

    private
    
    def art_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
