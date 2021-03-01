class Media < ApplicationRecord
  belongs_to :team_quest_link

  validates :url, presence: true
  validates :url, uniqueness: {
    message: 'This url already exists in the DB.'
  }
end
