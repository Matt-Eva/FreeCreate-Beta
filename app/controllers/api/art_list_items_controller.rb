class Api::ArtListItemsController < ApplicationController

    before_action :authorize

    def index
        user = current_user
        art_list_items = user.art_list_items
        render json: art_list_items, status: :ok
    end

    def create
        list_item = current_user.art_list_items.create!(art_id: params[:art_id])
        art = Art.find(params[:art_id])
        if !art.rank
            art.update(rank: 1)
        else
            art.update(rank: (art.rank + 1))
        end
        render json: list_item, status: :created
    end

    def destroy
        list_item = ArtListItem.find(params[:id])
        art = list_item.art
        if !art.rank
            art.update(rank: 0)
        else
            art.update(rank: (art.rank - 10))
        end
        list_item.destroy()
        head :no_content
    end

end
