class AddColumnsToWriting < ActiveRecord::Migration[7.0]
  def change
    add_column :writings, :public_thumbnail_id, :string
  end
end
