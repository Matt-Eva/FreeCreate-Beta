class Art < ApplicationRecord
  belongs_to :creator
  has_many :art_lib_items, dependent: :destroy
  has_many :libraries, through: :art_lib_items, source: :user
  has_many :art_list_items, dependent: :destroy
  has_many :lists, through: :art_list_items, source: :user
  has_many :art_likes, dependent: :destroy
  has_many :likes, through: :art_likes, source: :user
  has_many :art_comments, dependent: :destroy
  has_many :commenters, through: :art_comments, source: :user
  has_many :art_donations, dependent: :destroy
  has_many :donators, through: :art_donations, source: :user

  has_many :art_taglinks, dependent: :destroy
  has_many :tags, through: :art_taglinks
end
