class AddRankingColumnToWriting < ActiveRecord::Migration[7.0]
  def change
    add_column :writings, :rank, :integer
  end
end
