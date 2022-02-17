class Api::VidListItemsController < ApplicationController

    before_action :authorize

    def index
        user = current_user
        vid_list_items = user.vid_list_items
        render json: vid_list_items, status: :ok
    end

    def create
        list_item = current_user.vid_list_items.create!(video_id: params[:video_id])
        video = Video.find(params[:video_id])
        if !video.rank
            video.update(rank: 1)
        else
            video.update(rank: (video.rank + 1))
        end
        render json: list_item, status: :created
    end

    def destroy
        list_item = VidListItem.find(params[:id])
        video = list_item.video
        if !video.rank
            video.update(rank: 0)
        else
            video.update(rank: (video.rank - 1))
        end
        list_item.destroy()
        head :no_content
    end


end
