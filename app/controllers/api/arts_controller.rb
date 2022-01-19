class Api::ArtsController < ApplicationController

    def index
        art = Art.all.slice(0, 51)
        render json: art, include: ['creator', 'creator.user'], status: :ok
    end

    def show
        art = Art.find(params[:id])
        render json: art, status: :ok
    end

    def create
        art = Art.create!(art_params)
        render json: art, status: :created
    end

    def update
        art = Art.find(params[:id])
        art.update!(art_params)
        render json: art, status: :accepted
    end

    def destroy
        art = Art.find(params[:id])
        art.destroy
        head :no_content
    end

    private
    
    def art_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
