class CreateWritings < ActiveRecord::Migration[7.0]
  def change
    create_table :writings do |t|
      t.belongs_to :creator, null: false, foreign_key: true
      t.string :title
      t.string :thumbnail
      t.string :content
      t.string :category
      t.integer :length

      t.timestamps
    end
  end
end
