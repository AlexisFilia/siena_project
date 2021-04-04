class CreateUserRoleLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :user_role_links do |t|
      t.references :user, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true
      t.boolean :on_boarding, default: false

      t.timestamps
    end
  end
end
