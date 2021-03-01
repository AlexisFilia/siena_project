class QuestTagLink < ApplicationRecord
  belongs_to :quest
  belongs_to :tag
end
