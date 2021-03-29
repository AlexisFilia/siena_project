class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name
      t.text :description
      t.string :values
      t.integer :points_level
      t.integer :points_optional
      t.integer :points_votes
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end

