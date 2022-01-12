class ArtTaglink < ApplicationRecord
  belongs_to :art
  belongs_to :tag
end
