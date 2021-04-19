class UserRoleLink < ApplicationRecord
  belongs_to :user
  belongs_to :role

  validates :role, uniqueness: {
    scope: :user,
    message: 'Ce User Role Link existe déjà.'
  }
end
