class WritTaglink < ApplicationRecord
  belongs_to :writing
  belongs_to :tag
end
