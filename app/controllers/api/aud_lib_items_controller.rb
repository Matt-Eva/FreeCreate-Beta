class Api::AudLibItemsController < ApplicationController
    before_action :authorize
    
    def index
        user = current_user
        aud_lib_items = user.aud_lib_items
        render json: aud_lib_items, status: :ok
    end

    def create
        lib_item = current_user.aud_lib_items.create!(audio_id: params[:audio_id])
        audio = Audio.find(params[:audio_id])
        if !audio.rank
            audio.update(rank: 10)
        else
            audio.update(rank: (audio.rank + 10))
        end
        render json: lib_item, status: :created
    end

    def destroy
        lib_item = AudLibItem.find(params[:id])
        audio = lib_item.audio
        if !audio.rank
            audio.update(rank: 0)
        else
            audio.update(rank: (audio.rank - 10))
        end
        lib_item.destroy()
        head :no_content
    end
end
