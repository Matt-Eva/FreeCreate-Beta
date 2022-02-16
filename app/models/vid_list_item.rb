class VidListItem < ApplicationRecord
  belongs_to :video
  belongs_to :user
  validates :video_id, uniqueness: {scope: [:user_id]}
end
