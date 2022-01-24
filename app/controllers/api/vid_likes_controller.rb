class Api::VidLikesController < ApplicationController

    def index
        vid_likes = current_user.vid_likes
        render json: vid_likes, status: :ok
    end

    def create
        like = current_user.vid_likes.create!(video_id: params[:video_id])
        video = Video.find(params[:video_id])
        if !video.rank
            video.update(rank: 0)
        else
            video.update(rank: (video.rank + 5))
        end
        render json: like, status: :created
    end

    def destroy
        like = VidLike.find(params[:id])
        video = like.video
        if !video.rank
            video.update(rank: 0)
        else
            video.update(rank: (video.rank - 5))
        end
        like.destroy()
        head :no_content
    end

end
