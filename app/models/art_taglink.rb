class ArtTaglink < ApplicationRecord
  belongs_to :art
  belongs_to :tag
  validates :art_id, uniqueness: {scope: [:tag_id]}
end
