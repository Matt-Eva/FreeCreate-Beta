class Api::ArtLikesController < ApplicationController

    def index
        art_likes = current_user.art_likes
        render json: art_likes, status: :ok
    end

    def create
        like = current_user.art_likes.create!(art_id: params[:art_id])
        art = Art.find(params[:art_id])
        art.update(rank: (art.rank + 5))
        render json: like, status: :created
    end

    def destroy
        like = ArtLike.find(params[:id])
        art = like.art
        if !art.rank
            art.update(rank: 0)
        else
            art.update(rank: (art.rank - 5))
        end
        like.destroy()
        head :no_content
    end

end
