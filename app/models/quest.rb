class Quest < ApplicationRecord
  belongs_to :level

  has_many :team_quest_links, dependent: :destroy
  has_many :quest_tag_links, dependent: :destroy
  has_many :tags, through: :quest_tag_links
end
