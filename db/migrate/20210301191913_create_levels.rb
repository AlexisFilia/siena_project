class CreateLevels < ActiveRecord::Migration[6.1]
  def change
    create_table :levels do |t|
      t.string :name
      t.integer :next_level_id

      t.timestamps
    end
  end
end
