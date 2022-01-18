class Api::VidTaglinksController < ApplicationController
    def create
        tag = Tag.find_by(tag: params[:tag])
        if tag
            taglink = VidTaglink.create!(tag_id: tag.id, video_id: params[:video_id])
            render json: taglink, status: :created
        elsif !tag
            newTag = Tag.create!(tag: params[:tag])
            taglink = VidTaglink.create!(tag_id: newTag.id, video_id: params[:video_id])
            render json: taglink, status: :created
        else
            render json: {error: "Tag not found"}, status: :not_found
        end
    end
end
