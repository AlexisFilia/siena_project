class Message < ApplicationRecord
  belongs_to :user

  has_one :team, through: :user
  has_many :medias
  has_one :poll

  validates :type_of, presence: true


  def anchor
    "message-#{self.id}"
  end

end
