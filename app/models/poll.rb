class Poll < ApplicationRecord
  belongs_to :compagny
  belongs_to :user

  has_many :options, dependent: :destroy
  has_many :poll_user_links, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :type_of, presence: true
  validates :perimeter, presence: true
  validates :name, uniqueness: {
    scope: :company,
    message: 'This poll name already exists in the DB.'
  }
end
