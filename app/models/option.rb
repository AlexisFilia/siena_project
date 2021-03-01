class Option < ApplicationRecord
  belongs_to :poll, dependent: :destroy

  has_many :poll_user_links
end
