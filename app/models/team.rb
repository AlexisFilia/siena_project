class Team < ApplicationRecord
  belongs_to :compagny

  has_many :users, dependent: :destroy
  has_many :team_quest_links, dependent: :destroy
  has_many :quests, through: :team_quest_links
end
