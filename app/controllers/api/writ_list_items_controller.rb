class Api::WritListItemsController < ApplicationController

    before_action :authorize

    def index
        user = current_user
        writ_list_items = user.writ_list_items
        render json: writ_list_items, status: :ok
    end

    def create
        list_item = current_user.writ_list_items.create!(writing_id: params[:writing_id])
        writing = Writing.find(params[:writing_id])
        if !writing.rank
            writing.update(rank: 1)
        else
            writing.update(rank: (writing.rank + 1))
        end
        render json: list_item, status: :created
    end

    def destroy
        list_item = WritListItem.find(params[:id])
        writing = list_item.writing
        if !writing.rank
            writing.update(rank: 0)
        else
            writing.update(rank: (writing.rank - 1))
        end
        list_item.destroy()
        head :no_content
    end

end
