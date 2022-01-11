class VidLike < ApplicationRecord
  belongs_to :video
  belongs_to :user
end
