class CreateCreators < ActiveRecord::Migration[7.0]
  def change
    create_table :creators do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :payment_info
      t.string :prof_pic
      t.string :name
      t.boolean :is_writer
      t.boolean :is_audio
      t.boolean :is_artist
      t.boolean :is_video

      t.timestamps
    end
  end
end
