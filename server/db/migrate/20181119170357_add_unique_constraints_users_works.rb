class AddUniqueConstraintsUsersWorks < ActiveRecord::Migration[5.2]
  def change
    add_index :users_works, [:work_id, :user_id], unique: true
  end
end
