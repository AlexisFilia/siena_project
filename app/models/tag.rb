class Tag < ApplicationRecord
  has_many :quest_tag_links, dependent: :destroy
  has_many :quests, through: :quest_tag_links
end
