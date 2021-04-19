class PollUserLink < ApplicationRecord
  belongs_to :user
  belongs_to :option
  belongs_to :poll

  validates :poll, uniqueness: {
    scope: :user,
    message: 'Cet User a déjà participé au Poll.'
  }
end
