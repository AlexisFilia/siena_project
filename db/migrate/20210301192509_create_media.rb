class CreateMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :media do |t|
      t.string :url
      t.references :team_quest_link, null: false, foreign_key: true

      t.timestamps
    end
  end
end
