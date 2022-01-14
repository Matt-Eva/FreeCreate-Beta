class Creator < ApplicationRecord
  validates :name, presence: :true

  belongs_to :user
  
  has_many :creator_taglinks
  has_many :tags, through: :creator_taglinks
  
  has_many :writings
  has_many :writ_donations
  has_many :donated_writs, through: :writ_donations, source: :writing

  has_many :audios
  has_many :aud_donations
  has_many :donated_auds, through: :aud_donations, source: :audio

  has_many :arts
  has_many :art_donations
  has_many :donated_arts, through: :art_donations, source: :art

  has_many :videos
  has_many :vid_donations
  has_many :donated_vids, through: :vid_donations, source: :video
end
