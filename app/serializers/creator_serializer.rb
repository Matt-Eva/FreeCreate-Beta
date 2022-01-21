class CreatorSerializer < ActiveModel::Serializer
  attributes :id, :name, :prof_pic
  has_one :user
  has_many :writings
  has_many :arts
  has_many :videos
  has_many :audios
end
