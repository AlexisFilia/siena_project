class Compagny < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :polls, dependent: :destroy
  has_many :teams, dependent: :destroy

  validates :name, presence: true
  validates :logo, presence: true
  validates :name, uniqueness: {
    message: 'This company name already exists in the DB.'
  }
end
