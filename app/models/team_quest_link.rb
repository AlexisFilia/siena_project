class TeamQuestLink < ApplicationRecord
  belongs_to :team
  belongs_to :quest

  has_many :votes
  has_many :media
  has_many :likes
  has_one :level, through: :quest
  has_many :quest_tag_links, through: :quest
  has_many :tags, through: :quest_tag_links
end
