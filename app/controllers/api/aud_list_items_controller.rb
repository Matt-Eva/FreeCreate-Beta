class Api::AudListItemsController < ApplicationController

    before_action :authorize

    def index
        user = current_user
        aud_list_items = user.aud_list_items
        render json: aud_list_items, status: :ok
    end

    def create
        list_item = current_user.aud_list_items.create!(audio_id: params[:audio_id])
        audio = Audio.find(params[:audio_id])
        if !audio.rank
            audio.update(rank: 1)
        else
            audio.update(rank: (audio.rank + 1))
        end
        render json: list_item, status: :created
    end

    def destroy
        list_item = AudioListItem.find(params[:id])
        audio = list_item.audio
        if !audio.rank
            audio.update(rank: 0)
        else
            audio.update(rank: (audio.rank - 1))
        end
        list_item.destroy()
        head :no_content
    end

end
