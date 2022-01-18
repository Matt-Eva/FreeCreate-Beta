class ArtTaglinkSerializer < ActiveModel::Serializer
  attributes :id
  has_one :tag
end
