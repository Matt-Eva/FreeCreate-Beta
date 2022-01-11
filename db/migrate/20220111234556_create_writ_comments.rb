class CreateWritComments < ActiveRecord::Migration[7.0]
  def change
    create_table :writ_comments do |t|
      t.belongs_to :writing, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
