class Writing < ApplicationRecord
  belongs_to :creator
  has_many :writ_lib_items, dependent: :destroy
  has_many :libraries, through: :writ_lib_items, source: :user
  has_many :writ_list_items, dependent: :destroy
  has_many :lists, through: :writ_list_items, source: :user
  has_many :writ_likes, dependent: :destroy
  has_many :likes, through: :writ_likes, source: :user
  has_many :writ_comments, dependent: :destroy
  has_many :commenters, through: :writ_comments, source: :user
  has_many :writ_donations, dependent: :destroy
  has_many :donators, through: :writ_donations, source: :user

  has_many :writ_taglinks, dependent: :destroy
  has_many :tags, through: :writ_taglinks

  def ranking
    likes = self.writ_likes.length
    libs = self.writ_lib_items.length
    queues = self.writ_list_items.length

    rank = queues + (likes * 5) + (libs * 10)
    rank
  end

  def self.order_all
    self.all.sort_by{|a| -(a.ranking)}.slice(0, 51)
  end
end
