class Api::WritingsController < ApplicationController
    
    def index
        writings = Writing.all.slice(0, 51)
        render json: writings, include: ['creator', 'creator.user'], status: :ok
    end

    def show
        writing = Writing.find(params[:id])
        render json: writing, status: :ok
    end

    def create
        writing = Writing.create!(writing_params)
        render json: writing, status: :created
    end

    private
    
    def writing_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
