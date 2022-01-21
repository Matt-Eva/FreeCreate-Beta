class AddRankColumnToAudio < ActiveRecord::Migration[7.0]
  def change
    add_column :audios, :rank, :integer
  end
end
