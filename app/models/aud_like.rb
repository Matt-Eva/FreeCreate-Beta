class AudLike < ApplicationRecord
  belongs_to :audio
  belongs_to :user
end
