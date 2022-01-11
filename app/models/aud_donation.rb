class AudDonation < ApplicationRecord
  belongs_to :audio
  belongs_to :user
  belongs_to :creator
end
