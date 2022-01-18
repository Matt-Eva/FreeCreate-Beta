class Creator < ApplicationRecord
  validates :name, presence: :true

  belongs_to :user
  
  has_many :creator_taglinks, dependent: :destroy
  has_many :tags, through: :creator_taglinks
  
  has_many :writings, dependent: :destroy
  has_many :writ_donations, dependent: :destroy
  has_many :donated_writs, through: :writ_donations, source: :writing

  has_many :audios, dependent: :destroy
  has_many :aud_donations, dependent: :destroy
  has_many :donated_auds, through: :aud_donations, source: :audio

  has_many :arts, dependent: :destroy
  has_many :art_donations, dependent: :destroy
  has_many :donated_arts, through: :art_donations, source: :art

  has_many :videos, dependent: :destroy
  has_many :vid_donations, dependent: :destroy
  has_many :donated_vids, through: :vid_donations, source: :video
end
