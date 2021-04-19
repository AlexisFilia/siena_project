class QuestTagLink < ApplicationRecord
  belongs_to :quest
  belongs_to :tag

  validates :tag, uniqueness: {
    scope: :quest,
    message: 'Ce Tag est déjà lié avec cette Quest.'
  }
end
