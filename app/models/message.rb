class Message < ApplicationRecord
  belongs_to :user

  validates :type_of, presence: true
end
