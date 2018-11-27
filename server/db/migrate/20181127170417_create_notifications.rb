class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :redirects_to
      t.boolean :read
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
