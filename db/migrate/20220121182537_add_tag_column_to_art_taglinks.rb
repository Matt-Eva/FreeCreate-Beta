class AddTagColumnToArtTaglinks < ActiveRecord::Migration[7.0]
  def change
    add_column :art_taglinks, :tag_text, :string
  end
end
