class VidDonation < ApplicationRecord
  belongs_to :video
  belongs_to :user
  belongs_to :creator
end
