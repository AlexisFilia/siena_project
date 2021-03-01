class Like < ApplicationRecord
  belongs_to :team_quest_link
  belongs_to :user
end
