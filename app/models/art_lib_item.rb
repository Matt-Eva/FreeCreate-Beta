class ArtLibItem < ApplicationRecord
  belongs_to :art
  belongs_to :user
  validates :art_id, uniqueness: {scope: [:user_id]}
end
