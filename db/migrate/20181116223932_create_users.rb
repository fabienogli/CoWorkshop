class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :pseudo
      t.string :mail
      t.string :password
      t.string :website

      t.timestamps
    end
  end
end
