class Company < ApplicationRecord
  # has_many :polls, dependent: :destroy
  has_many :teams, dependent: :destroy
  has_many :users, through: :teams

  validates :name, presence: true
  validates :logo, presence: true
  validates :name, uniqueness: {
    message: 'This company name already exists in the DB.'
  }
end
