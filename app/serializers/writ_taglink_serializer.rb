class WritTaglinkSerializer < ActiveModel::Serializer
  attributes :id, :tag_id
  has_one :tag
end
