class Api::WritTaglinksController < ApplicationController

def create
    newTag = Tag.find_by(tag: params[:tag])
    if newTag
        taglink = WritTaglink.create!(tag_id: newTag.id, writing_id: params[:writing_id], tag_text: newTag.tag)
        render json: taglink, status: :created
    elsif !newTag
        newTag = Tag.create!(tag: params[:tag])
        taglink = WritTaglink.create!(tag_id: newTag.id, writing_id: params[:writing_id], tag_text: newTag.tag)
        render json: taglink, status: :created
    else
        render json: {error: "Tag not found"}, status: :not_found
    end
end

def destroy
        art_taglink = WritTaglink.find(params[:id])
        art_taglink.destroy
        head :no_content
end

end
