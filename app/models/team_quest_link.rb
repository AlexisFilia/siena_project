class TeamQuestLink < ApplicationRecord
  belongs_to :team
  belongs_to :quest
end
