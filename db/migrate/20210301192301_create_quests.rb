class CreateQuests < ActiveRecord::Migration[6.1]
  def change
    create_table :quests do |t|
      t.string :name
      t.text :description
      t.text :criteria
      t.string :type_of
      t.string :map_position
      t.string :roulette
      t.references :level, null: false, foreign_key: true

      t.timestamps
    end
  end
end
