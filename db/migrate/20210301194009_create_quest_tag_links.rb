class CreateQuestTagLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :quest_tag_links do |t|
      t.references :quest, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
