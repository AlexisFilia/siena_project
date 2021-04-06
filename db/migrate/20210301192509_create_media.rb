class CreateMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :media do |t|
      # t.string :url
      t.string :type_of
      t.references :team_quest_link, null: true, foreign_key: true
      t.references :message, null: true, foreign_key: true

      t.timestamps
    end
  end
end
