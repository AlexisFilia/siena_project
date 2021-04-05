class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name
      t.text :description
      t.string :values
      t.integer :points_level, default: 0
      t.integer :points_optional, default: 0
      t.integer :points_votes, default: 0
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end


