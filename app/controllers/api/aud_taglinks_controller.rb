class Api::AudTaglinksController < ApplicationController

    def create
        tag = Tag.find_by(tag: params[:tag])
        if tag
            taglink = AudTaglink.create!(tag_id: tag.id, audio_id: params[:audio_id])
            render json: taglink, status: :created
        elsif !tag
            newTag = Tag.create!(tag: params[:tag])
            taglink = AudTaglink.create!(tag_id: newTag.id, audio_id: params[:audio_id])
            render json: taglink, status: :created
        else
            render json: {error: "Tag not found"}, status: :not_found
        end
    end

end
