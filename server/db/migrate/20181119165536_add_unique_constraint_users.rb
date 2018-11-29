class AddUniqueConstraintUsers < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :mail, unique: true
    add_index :users, :pseudo, unique: true
  end
end
