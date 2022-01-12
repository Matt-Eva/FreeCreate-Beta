class CreateCreatorTaglinks < ActiveRecord::Migration[7.0]
  def change
    create_table :creator_taglinks do |t|
      t.belongs_to :creator, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
