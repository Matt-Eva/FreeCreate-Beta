class WritingSerializer < ActiveModel::Serializer
  attributes :id, :thumbnail, :content, :title
  has_one :creator
  has_many :writ_taglinks
end
