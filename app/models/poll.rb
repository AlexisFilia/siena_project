class Poll < ApplicationRecord
  belongs_to :compagny
  belongs_to :user

  has_many :options, dependent: :destroy
  has_many :poll_user_links, dependent: :destroy
end
