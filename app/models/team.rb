class Team < ApplicationRecord
  belongs_to :company

  has_many :users, dependent: :destroy
  has_many :team_quest_links, dependent: :destroy
  has_many :quests, through: :team_quest_links

  validates :name, presence: true
  validates :name, uniqueness: {
    scope: :company,
    message: 'This company name already exists in the DB.'
  }
end
