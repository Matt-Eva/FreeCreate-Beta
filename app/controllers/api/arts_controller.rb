class Api::ArtsController < ApplicationController

    before_action :authorize, only: [:create, :update, :destroy, :lib_arts]

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

    def search_query
        arts = Art.where("title LIKE ?", "%#{params[:search]}%")
        render json: arts, status: :ok
    end

    def filter_query
        tag = Tag.find_by(tag: params[:tag])
        if !tag
            render json: {message: "That filter produced no results"}, status: :not_found
        else
            arts = tag.arts
            render json: arts, status: :ok
        end
    end

    def lib_art
        user = current_user
        art = user.lib_arts
        render json: {art: art}, status: :ok
    end

    def list_art
        user = current_user
        art = user.list_arts
        render json: {art: art}, status: :ok
    end

    private
    
    def art_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id, :rank)
    end
end
