class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :nickname, :prof_pic
  has_many :creators
#   has_many :writ_likes
#   has_many :art_likes
#   has_many :vid_likes
#   has_many :aud_likes
end
