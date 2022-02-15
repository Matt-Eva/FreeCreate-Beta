class Api::WritLibItemsController < ApplicationController

    before_action :authorize
    
    def index
        user = current_user
        writ_lib_items = user.writ_lib_items
        render json: writ_lib_items, status: :ok
    end

    def create
        lib_item = current_user.writ_lib_items.create!(writing_id: params[:writing_id])
        writing = Writing.find(params[:writing_id])
        if !writing.rank
            writing.update(rank: 10)
        else
            writing.update(rank: (art.rank + 10))
        end
        render json: lib_item, status: :created
    end

    def destroy
        lib_item = WritLibItem.find(params[:id])
        writing = lib_item.writing
        if !writing.rank
            writing.update(rank: 0)
        else
            writing.update(rank: (writing.rank - 10))
        end
        lib_item.destroy()
        head :no_content
    end

end

