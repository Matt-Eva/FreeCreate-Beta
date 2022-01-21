class AudTaglink < ApplicationRecord
  belongs_to :audio
  belongs_to :tag
  validates :audio_id, uniqueness: {scope: [:tag_id]}
end
