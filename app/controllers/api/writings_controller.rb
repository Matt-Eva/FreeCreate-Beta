class Api::WritingsController < ApplicationController

    before_action :authorize, only: [:create, :update, :destroy, :lib_writing]
    
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

    def update
        writing = Writing.find(params[:id])
        writing.update!(writing_params)
        render json: writing, status: :accepted
    end

    def destroy
        writing = Writing.find(params[:id])
        writing.destroy
        head :no_content
    end

    def search_query
        writings = Writing.where("title LIKE ?", "%#{params[:search]}%").sort_by{|a| -(a.ranking)}.slice(0, 51)
        render json: writings, status: :ok
    end

    def filter_query
        tag = Tag.find_by(tag: params[:tag])
        if !tag
            render json: {message: "That filter produced no results"}, status: :not_found
        else
            writings = tag.writings.sort_by{|a| -(a.ranking)}.slice(0, 51)
            render json: writings, status: :ok
        end
    end

    def lib_writing
        user = current_user
        writing = user.lib_writs
        render json: {writ: writing}, status: :ok
    end

    private
    
    def writing_params
        params.permit(:category, :title, :thumbnail, :content, :length, :creator_id, :rank)
    end
end
