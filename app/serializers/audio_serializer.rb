class AudioSerializer < ActiveModel::Serializer
  attributes :id, :thumbnail, :content, :title
  has_one :creator
  has_many :aud_taglinks
end
