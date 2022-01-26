class Api::AudTaglinksController < ApplicationController

    before_action :authorize

    def create
        tag = Tag.find_by(tag: params[:tag])
        if tag
            taglink = AudTaglink.create!(tag_id: tag.id, audio_id: params[:audio_id], tag_text: tag.tag)
            render json: taglink, status: :created
        elsif !tag
            newTag = Tag.create!(tag: params[:tag])
            taglink = AudTaglink.create!(tag_id: newTag.id, audio_id: params[:audio_id], tag_text: tag.tag)
            render json: taglink, status: :created
        else
            render json: {error: "Tag not found"}, status: :not_found
        end
    end

    def destroy
        aud_taglink = AudTaglink.find(params[:id])
        aud_taglink.destroy
        head :no_content
    end

end
