class Api::WritLikesController < ApplicationController

    def index
        writ_likes = current_user.writ_likes
        render json: writ_likes, status: :ok
    end

    def create
        like = current_user.writ_likes.create!(writing_id: params[:writing_id])
        writing = Writing.find(params[:writing_id])
        if !writing.rank
            writing.update(rank: 0)
        else
            writing.update(rank: (writing.rank + 5))
        end
        render json: like, status: :created
    end

    def destroy
        like = WritLike.find(params[:id])
        writing = like.writing
        if !writing.rank
            writing.update(rank: 0)
        else
            writing.update(rank: (writing.rank - 5))
        end
        like.destroy()
        head :no_content
    end

end
