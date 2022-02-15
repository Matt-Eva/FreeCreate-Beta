class Api::VidLibItemsController < ApplicationController

    before_action :authorize
    
    def index
        user = current_user
        vid_lib_items = user.vid_lib_items
        render json: vid_lib_items, status: :ok
    end

    def create
        lib_item = current_user.vid_lib_items.create!(video_id: params[:video_id])
        video = Video.find(params[:video_id])
        if !video.rank
            video.update(rank: 10)
        else
            video.update(rank: (video.rank + 10))
        end
        render json: lib_item, status: :created
    end

    def destroy
        lib_item = VidLibItem.find(params[:id])
        video = lib_item.video
        if !video.rank
            video.update(rank: 0)
        else
            video.update(rank: (video.rank - 10))
        end
        lib_item.destroy()
        head :no_content
    end

end
