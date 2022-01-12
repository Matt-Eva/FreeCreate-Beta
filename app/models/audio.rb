class Audio < ApplicationRecord
  belongs_to :creator
  has_many :aud_lib_items
  has_many :libraries, through: :aud_lib_items, source: :user
  has_many :aud_list_items
  has_many :lists, through: :aud_list_items, source: :user
  has_many :aud_likes
  has_many :likes, through: :aud_likes, source: :user
  has_many :aud_comments
  has_many :commenters, through: :aud_comments, source: :user
  has_many :aud_donations
  has_many :donators, through: :aud_donations, source: :user

  has_many :aud_taglinks
  has_many :tags, through: :aud_taglinks
end
