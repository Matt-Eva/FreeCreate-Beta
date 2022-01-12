class Video < ApplicationRecord
  belongs_to :creator
  has_many :vid_lib_items
  has_many :libraries, through: :vid_lib_items, source: :user
  has_many :vid_list_items
  has_many :lists, through: :vid_list_items, source: :user
  has_many :vid_likes
  has_many :likes, through: :vid_likes, source: :user
  has_many :vid_comments
  has_many :commenters, through: :vid_comments, source: :user
  has_many :vid_donations
  has_many :donators, through: :vid_donations, source: :user
end
