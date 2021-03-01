class Vote < ApplicationRecord
  belongs_to :team_quest_link
  belongs_to :user

  validates :vote, presence: true
end
