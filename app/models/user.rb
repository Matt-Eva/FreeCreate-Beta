class User < ApplicationRecord

    has_many :recurring_donations
    has_many :single_donations
    has_many :follows
    has_many :subscriptions

    has_many :creators

    has_many :writ_lib_items
    has_many :lib_writs, through: :writ_lib_items, source: :writing
    has_many :writ_list_items
    has_many :list_writs, through: :writ_list_items, source: :writing
    has_many :writ_likes
    has_many :liked_writs, through: :writ_likes, source: :writing
    has_many :writ_comments
    has_many :commented_writs, through: :writ_comments, source: :writing
    has_many :writ_donations
    has_many :donated_writs, through: :writ_donations, source: :writing

    has_many :aud_lib_items
    has_many :lib_auds, through: :aud_lib_items, source: :audio
    has_many :aud_list_items
    has_many :list_auds, through: :aud_list_items, source: :audio
    has_many :aud_likes
    has_many :liked_auds, through: :aud_likes, source: :audio
    has_many :aud_comments
    has_many :commented_auds, through: :aud_comments, source: :audio
    has_many :aud_donations
    has_many :donated_auds, through: :aud_donations, source: :audio
end
