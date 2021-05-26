class Quest < ApplicationRecord
  belongs_to :level

  has_many :team_quest_links, dependent: :destroy
  has_many :quest_tag_links, dependent: :destroy
  has_many :tags, through: :quest_tag_links

  validates :name, presence: true
  validates :criteria, presence: true
  validates :type_of, presence: true
  # validates :map_position, presence: true
  # validates :validation_type, presence: true

  def self.accessible_quest?(level_id, team_current_level)
    available_quests = []
    Level.all.each do |l|
      if l.id <= team_current_level.id
        available_quests += l.quests
      end
    end
    !available_quests.select { |quest| quest.id == level_id.to_i }.blank?
  end
end
