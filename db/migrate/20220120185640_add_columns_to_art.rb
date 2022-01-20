class AddColumnsToArt < ActiveRecord::Migration[7.0]
  def change
    add_column :arts, :public_thumbnail_id, :string
    add_column :arts, :public_id, :string
  end
end
