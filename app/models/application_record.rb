class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def email_is_valid
    errors.add(:email, 'The format of this email is wrong.') unless EmailValidator.valid?(email, mode: :strict)
  end
end
