class Tag < ApplicationRecord
    has_many :writ_taglinks, dependent: :destroy
    has_many :writings, through: :writ_taglinks

    has_many :aud_taglinks, dependent: :destroy
    has_many :audios, through: :aud_taglinks

    has_many :creator_taglinks, dependent: :destroy
    has_many :creators, through: :creator_taglinks

    has_many :art_taglinks, dependent: :destroy
    has_many :arts, through: :art_taglinks

    has_many :vid_taglinks, dependent: :destroy
    has_many :videos, through: :vid_taglinks
end
