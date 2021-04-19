class Vote < ApplicationRecord
  belongs_to :team_quest_link
  belongs_to :user

  validates :team_quest_link, uniqueness: {
    scope: :user,
    message: 'Cet User a déjà voté pour ce Team Quest Link.'
  }
end
