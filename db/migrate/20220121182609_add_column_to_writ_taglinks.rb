class AddColumnToWritTaglinks < ActiveRecord::Migration[7.0]
  def change
    add_column :writ_taglinks, :tag_text, :string
  end
end
