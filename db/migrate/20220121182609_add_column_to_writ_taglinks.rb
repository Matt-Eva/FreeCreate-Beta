class AddColumnToWritTaglinks < ActiveRecord::Migration[7.0]
  def change
    add_column :writ_taglinks, :tag, :string
  end
end
