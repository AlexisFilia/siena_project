class Tag < ApplicationRecord
  has_many :quest_tag_links, dependent: :destroy
  has_many :quests, through: :quest_tag_links

  validates :name, presence: true
  validates :name, uniqueness: {
    message: 'This tag name already exists in the DB.'
  }
end
