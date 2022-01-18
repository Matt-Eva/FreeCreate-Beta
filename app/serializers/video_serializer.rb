class VideoSerializer < ActiveModel::Serializer
  attributes :id, :thumbnail, :content, :title, :tags
  has_one :creator
end
