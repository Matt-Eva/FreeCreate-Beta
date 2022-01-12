class SingleDonation < ApplicationRecord
  belongs_to :user
  belongs_to :creator
end
