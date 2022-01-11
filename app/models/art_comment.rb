class ArtComment < ApplicationRecord
  belongs_to :art
  belongs_to :user
end
