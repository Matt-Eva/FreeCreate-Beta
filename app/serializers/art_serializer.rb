class ArtSerializer < ActiveModel::Serializer
  attributes :id, :thumbnail, :content, :title
  has_one :creator
  has_many :art_taglinks
end
