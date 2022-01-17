class Api::WritTaglinksController < ApplicationController

def create
    tag = Tag.find_by(tag: params[:tag])
    if tag
        taglink = WritTaglink.create!(tag_id: tag.id, writing_id: params[:writing_id])
        render json: taglink, status: :created
    elsif !tag
        newTag = Tag.create!(tag: params[:tag])
        taglink = WritTaglink.create!(tag_id: newTag.id, writing_id: params[:writing_id])
        render json: taglink, status: :created
    else
        render json: {error: "Tag not found"}, status: :not_found
    end
end

end
