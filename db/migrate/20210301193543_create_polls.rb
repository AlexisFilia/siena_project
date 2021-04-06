class CreatePolls < ActiveRecord::Migration[6.1]
  def change
    create_table :polls do |t|
      t.string :name
      t.text :description
      t.string :type_of
      t.string :result
      t.string :perimeter
      # t.references :company, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :message, null: true, foreign_key: true

      t.timestamps
    end
  end
end

