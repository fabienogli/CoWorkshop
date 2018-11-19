class AddUniqueConstraintTagsUsers < ActiveRecord::Migration[5.2]
  def change
    add_index :tags_users, [:user_id, :tag_id], unique: true
  end
end
