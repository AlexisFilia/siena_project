class Contact < ApplicationRecord
  validates :email, presence: true
  validates :message, presence: true

  validate :email_is_valid
end
