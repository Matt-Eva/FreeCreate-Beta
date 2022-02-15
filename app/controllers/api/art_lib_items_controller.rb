class Api::ArtLibItemsController < ApplicationController
    before_action :authorize
    
    def index
        user = current_user
        art_lib_items = user.art_lib_items
        render json: art_lib_items, status: :ok
    end

    def create
        lib_item = current_user.art_lib_items.create!(art_id: params[:art_id])
        art = Art.find(params[:art_id])
        if !art.rank
            art.update(rank: 10)
        else
            art.update(rank: (art.rank + 10))
        end
        render json: lib_item, status: :created
    end

    def destroy
        lib_item = ArtLibItem.find(params[:id])
        art = lib_item.art
        if !art.rank
            art.update(rank: 0)
        else
            art.update(rank: (art.rank - 10))
        end
        lib_item.destroy()
        head :no_content
    end

end
