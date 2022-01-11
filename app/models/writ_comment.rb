class WritComment < ApplicationRecord
  belongs_to :writing
  belongs_to :user
end
