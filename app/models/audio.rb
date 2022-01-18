class Audio < ApplicationRecord
  belongs_to :creator
  has_many :aud_lib_items, dependent: :destroy
  has_many :libraries, through: :aud_lib_items, source: :user
  has_many :aud_list_items, dependent: :destroy
  has_many :lists, through: :aud_list_items, source: :user
  has_many :aud_likes, dependent: :destroy
  has_many :likes, through: :aud_likes, source: :user
  has_many :aud_comments, dependent: :destroy
  has_many :commenters, through: :aud_comments, source: :user
  has_many :aud_donations, dependent: :destroy
  has_many :donators, through: :aud_donations, source: :user

  has_many :aud_taglinks, dependent: :destroy
  has_many :tags, through: :aud_taglinks
end
