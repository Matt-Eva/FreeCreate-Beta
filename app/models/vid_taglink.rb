class VidTaglink < ApplicationRecord
  belongs_to :video
  belongs_to :tag
  validates :video_id, uniqueness: {scope: [:tag_id]}
end
