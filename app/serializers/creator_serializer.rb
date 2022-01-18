class CreatorSerializer < ActiveModel::Serializer
  attributes :id, :name, :prof_pic
  has_one :user
end
