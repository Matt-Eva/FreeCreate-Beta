class User < ApplicationRecord
    has_many :recurring_donations
    has_many :single_donations
    has_many :follows
    has_many :subscriptions
    has_many :creators
    has_many :writ_lib_items
    has_many :lib_writings, through: :writ_lib_items, source: :writing
    has_many :writ_list_items
    has_many :list_writings, through: :writ_list_items, source: :writing
    has_many :writ_likes
    has_many :liked_writs, through: :writ_likes, source: :writing
    has_many :writ_comments
    has_many :commented_writs, through: :writ_comments, source: :writing
    has_many :writ_donations
    has_many :donated_writes, through: :writ_donations, source: :writing
    
end
