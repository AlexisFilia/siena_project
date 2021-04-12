class Message < ApplicationRecord
  belongs_to :user

  has_one :team, through: :user
  has_many :media
  has_one :poll

  validates :perimeter, presence: true


  # def anchor
  #   "message-#{self.id}"
  # end

end
