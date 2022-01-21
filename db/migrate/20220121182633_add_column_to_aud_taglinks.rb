class AddColumnToAudTaglinks < ActiveRecord::Migration[7.0]
  def change
    add_column :aud_taglinks, :tag_text, :string
  end
end
