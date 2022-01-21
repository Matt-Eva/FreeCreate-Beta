class AddRankColumnToVideo < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :rank, :integer
  end
end
