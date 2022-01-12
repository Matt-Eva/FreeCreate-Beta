class AudTaglink < ApplicationRecord
  belongs_to :audio
  belongs_to :tag
end
