class Message < ApplicationRecord
  belongs_to :user
  has_one :team, through: :user

  validates :type_of, presence: true
end
