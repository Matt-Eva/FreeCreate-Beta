class AddColumnToCreators < ActiveRecord::Migration[7.0]
  def change
    add_column :creators, :public_prof_pic_id, :string
  end
end
