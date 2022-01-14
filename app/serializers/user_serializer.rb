class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :nickname, :prof_pic
  has_many :creators
end
