class CreateArtComments < ActiveRecord::Migration[7.0]
  def change
    create_table :art_comments do |t|
      t.belongs_to :art, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
