class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :type_of
      t.string :value
      t.integer :message_ref
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
