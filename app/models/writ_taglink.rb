class WritTaglink < ApplicationRecord
  belongs_to :writing
  belongs_to :tag
  validates :writing_id, uniqueness: {scope: [:tag_id]}
end
