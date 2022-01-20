class AddColumnsToAudio < ActiveRecord::Migration[7.0]
  def change
    add_column :audios, :public_thumbnail_id, :string
    add_column :audios, :public_id, :string
  end
end
