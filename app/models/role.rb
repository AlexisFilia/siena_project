class Role < ApplicationRecord
  has_many :user_role_links, dependent: :destroy
  has_many :users, through: :user_role_links
end
