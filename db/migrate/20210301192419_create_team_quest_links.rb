class CreateTeamQuestLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :team_quest_links do |t|
      t.references :team, null: false, foreign_key: true
      t.references :quest, null: false, foreign_key: true
      t.string :status, default: 'draft'
      t.text :roulette_result
      t.datetime :date_submission

      t.timestamps
    end
  end
end
