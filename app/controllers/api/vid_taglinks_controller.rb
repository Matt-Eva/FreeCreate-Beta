class Api::VidTaglinksController < ApplicationController

    def create
        tag = Tag.find_by(tag: params[:tag])
        if tag
            taglink = VidTaglink.create!(tag_id: tag.id, video_id: params[:video_id], tag_text: tag.tag)
            render json: taglink, status: :created
        elsif !tag
            tag = Tag.create!(tag: params[:tag])
            taglink = VidTaglink.create!(tag_id: tag.id, video_id: params[:video_id], tag_text: tag.tag)
            render json: taglink, status: :created
        else
            render json: {error: "Tag not found"}, status: :not_found
        end
    end

    def destroy
        vid_taglink = VidTaglink.find(params[:id])
        vid_taglink.destroy
        head :no_content
    end

end
