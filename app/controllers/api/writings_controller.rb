class Api::WritingsController < ApplicationController
    
    def create
        writing = Writing.create!(writing_params)
        render json: writing, status: :created
    end

    private
    
    def writing_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id)
    end
end
