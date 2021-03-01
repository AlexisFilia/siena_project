class Level < ApplicationRecord
  has_many :quests, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: {
    message: 'This level name already exists in the DB.'
  }
end
