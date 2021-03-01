class Level < ApplicationRecord
  has_many :quests, dependent: :destroy
end
