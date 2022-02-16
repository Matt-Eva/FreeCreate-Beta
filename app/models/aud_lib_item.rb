class AudLibItem < ApplicationRecord
  belongs_to :audio
  belongs_to :user
  validates :audio_id, uniqueness: {scope: [:user_id]}
end
