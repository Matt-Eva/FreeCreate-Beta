class Api::ArtTaglinksController < ApplicationController

    def create
        tag = Tag.find_by(tag: params[:tag])
        if tag
            taglink = ArtTaglink.create!(tag_id: tag.id, art_id: params[:art_id], tag_text: tag.tag)
            render json: taglink, status: :created
        elsif !tag
            newTag = Tag.create!(tag: params[:tag])
            taglink = ArtTaglink.create!(tag_id: newTag.id, art_id: params[:art_id], tag_text: newTag.tag)
            render json: taglink, status: :created
        else
            render json: {error: "Tag not found"}, status: :not_found
        end
    end

    def destroy
        art_taglink = ArtTaglink.find(params[:id])
        art_taglink.destroy
        head :no_content
    end

end
