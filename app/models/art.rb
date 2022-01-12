class Art < ApplicationRecord
  belongs_to :creator
  has_many :art_lib_items
  has_many :libraries, through: :art_lib_items, source: :user
  has_many :art_list_items
  has_many :lists, through: :art_list_items, source: :user
  has_many :art_likes
  has_many :likes, through: :art_likes, source: :user
  has_many :art_comments
  has_many :commenters, through: :art_comments, source: :user
  has_many :art_donations
  has_many :donators, through: :art_donations, source: :user

  has_many :art_taglinks
  has_many :tags, through: :art_taglinks
end
