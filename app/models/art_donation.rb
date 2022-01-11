class ArtDonation < ApplicationRecord
  belongs_to :art
  belongs_to :user
  belongs_to :creator
end
