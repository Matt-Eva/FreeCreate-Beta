class CreateVidLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :vid_likes do |t|
      t.belongs_to :video, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
