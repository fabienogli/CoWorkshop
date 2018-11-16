class CreateJoinTableWorksUsers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :works, :users do |t|
      # t.index [:work_id, :user_id]
      # t.index [:user_id, :work_id]
    end
  end
end
