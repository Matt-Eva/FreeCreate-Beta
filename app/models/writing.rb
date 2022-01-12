class Writing < ApplicationRecord
  belongs_to :creator
  has_many :writ_lib_items
  has_many :libraries, through: :writ_lib_items, source: :user
  has_many :writ_list_items
  has_many :lists, through: :writ_list_items, source: :user
  has_many :writ_likes
  has_many :likes, through: :writ_likes, source: :user
  has_many :writ_comments
  has_many :commenters, through: :writ_comments, source: :user
  has_many :writ_donations
  has_many :donators, through: :writ_donations, source: :user

  has_many :writ_taglinks
  has_many :tags, through: :writ_taglinks
end
