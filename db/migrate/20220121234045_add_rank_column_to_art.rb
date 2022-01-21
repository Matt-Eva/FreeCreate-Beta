class AddRankColumnToArt < ActiveRecord::Migration[7.0]
  def change
    add_column :arts, :rank, :integer
  end
end
