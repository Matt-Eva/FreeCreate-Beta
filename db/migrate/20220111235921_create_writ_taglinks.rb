class CreateWritTaglinks < ActiveRecord::Migration[7.0]
  def change
    create_table :writ_taglinks do |t|
      t.belongs_to :writing, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
