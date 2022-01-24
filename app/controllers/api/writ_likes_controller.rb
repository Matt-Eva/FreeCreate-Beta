class Api::WritLikesController < ApplicationController

    def create
        like = current_user.writ_likes.create!(writ_id: params[:writ_id])
        writing = Writing.find(params[:writ_id])
        writing.update(rank: (writing.rank + 5))
    end

end
