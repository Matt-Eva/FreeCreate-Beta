class AddColumnToVidTaglinks < ActiveRecord::Migration[7.0]
  def change
    add_column :vid_taglinks, :tag_text, :string
  end
end
