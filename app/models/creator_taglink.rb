class CreatorTaglink < ApplicationRecord
  belongs_to :creator
  belongs_to :tag
end
