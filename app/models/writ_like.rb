class WritLike < ApplicationRecord
  belongs_to :writing
  belongs_to :user
  validates :writing_id, uniqueness: {scope: [:user_id]}
end
