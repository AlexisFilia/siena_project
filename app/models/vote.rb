class Vote < ApplicationRecord
  belongs_to :team_quest_link
  belongs_to :user

  validates :team_quest_link, uniqueness: {
    scope: :user,
    message: 'Cet User a déjà voté pour ce Team Quest Link.'
  }

  def self.define_criteria(params, tql)
    tql_criteria = JSON.parse(tql.quest.criteria)
    criteria = {}
    params.keys.each do |key|
      if key.match(/valid-/)
        index = key.gsub(/valid-/, '').to_i
        criteria[tql_criteria[index]] = params[:vote]["why-#{index}"]
      end
    end
    criteria
  end
end
