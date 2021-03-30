class Message < ApplicationRecord
  belongs_to :user

  has_one :team, through: :user
  has_many :medias

  validates :type_of, presence: true
end
