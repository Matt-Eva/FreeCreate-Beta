class Api::AudLikesController < ApplicationController

    def index
        aud_likes = current_user.aud_likes
        render json: aud_likes, status: :ok
    end

    def create
        like = current_user.aud_likes.create!(audio_id: params[:audio_id])
        audio = Audio.find(params[:audio_id])
        if !audio.rank
            audio.update(rank: 0)
        else
            audio.update(rank: (audio.rank + 5))
        end
        render json: like, status: :created
    end

    def destroy
        like = AudLike.find(params[:id])
        audio = like.audio
        if !audio.rank
            audio.update(rank: 0)
        else
            audio.update(rank: (audio.rank - 5))
        end
        like.destroy()
        head :no_content
    end
end
