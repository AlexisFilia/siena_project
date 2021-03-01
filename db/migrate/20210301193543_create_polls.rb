class CreatePolls < ActiveRecord::Migration[6.1]
  def change
    create_table :polls do |t|
      t.string :name
      t.string :description
      t.string :type_of
      t.string :result
      t.string :perimeter
      t.references :compagny, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
