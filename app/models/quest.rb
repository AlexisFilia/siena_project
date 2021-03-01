class Quest < ApplicationRecord
  belongs_to :level

  has_many :team_quest_links, dependent: :destroy
  has_many :quest_tag_links, dependent: :destroy
  has_many :tags, through: :quest_tag_links

  validates :name, presence: true
  validates :criteria, presence: true
  validates :type_of, presence: true
  validates :map_position, presence: true
  validates :validation_type, presence: true
end
