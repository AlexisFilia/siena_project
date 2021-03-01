class Role < ApplicationRecord
  has_many :user_role_links, dependent: :destroy
  has_many :users, through: :user_role_links

  validates :name, presence: true
  validates :description, presence: true
  validates :name, uniqueness: {
    message: 'This role name already exists in the DB.'
  }
end
