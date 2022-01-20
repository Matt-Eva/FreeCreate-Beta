class AddColumnsToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :public_thumbnail_id, :string
    add_column :videos, :public_id, :string
  end
end
