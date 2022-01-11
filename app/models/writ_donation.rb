class WritDonation < ApplicationRecord
  belongs_to :writing
  belongs_to :user
  belongs_to :creator
end
