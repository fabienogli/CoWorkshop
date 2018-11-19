class AddUniqueConstraintTagsWorks < ActiveRecord::Migration[5.2]
  def change
    add_index :tags_works, [:work_id, :tag_id], unique: true
  end
end
