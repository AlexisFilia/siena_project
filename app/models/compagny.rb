class Compagny < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :polls, dependent: :destroy
  has_many :teams, dependent: :destroy
end
