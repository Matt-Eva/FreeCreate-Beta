class Video < ApplicationRecord
  belongs_to :creator
  has_many :vid_lib_items, dependent: :destroy
  has_many :libraries, through: :vid_lib_items, source: :user
  has_many :vid_list_items, dependent: :destroy
  has_many :lists, through: :vid_list_items, source: :user
  has_many :vid_likes, dependent: :destroy
  has_many :likes, through: :vid_likes, source: :user
  has_many :vid_comments, dependent: :destroy
  has_many :commenters, through: :vid_comments, source: :user
  has_many :vid_donations, dependent: :destroy
  has_many :donators, through: :vid_donations, source: :user

  has_many :vid_taglinks, dependent: :destroy
  has_many :tags, through: :vid_taglinks
end
