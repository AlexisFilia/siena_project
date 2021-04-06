class Poll < ApplicationRecord
  # belongs_to :company
  belongs_to :user
  belongs_to :message, optional: true

  has_many :options, dependent: :destroy
  has_many :poll_user_links, dependent: :destroy

  validates :name, presence: true
  validates :type_of, presence: true
  validates :perimeter, presence: true
  # validates :description, presence: true

  # validates :name, uniqueness: {
  #   scope: :company,
  #   message: 'This poll name already exists in the DB.'
  # }


  def get_options_with_votes
    # retourne un array de hash sous la forme [description: description, votes: votesAmount, percent: percentageoftotalvotes, best: true/false]
    # doit probablement etre amélioré pour vérifier qu´il n´y a qu´un seul vote par joueur??

    poll_options = self.options
    pulsAmount = self.poll_user_links.count
    best_option = poll_options.last
    best_option_votes = best_option.poll_user_links.count

    returned_array = []

    poll_options.each do |option|

      if option.poll_user_links.count > best_option_votes
        best = true
        best_option_votes = option.poll_user_links.count
      else
        best = false
      end

      percent = pulsAmount == 0 ? 0 : option.poll_user_links.count.to_f / pulsAmount.to_f

      returned_array << {description: option.description, votes: option.poll_user_links.count, percent: percent, best: best}
    end

    return returned_array
  end


  def has_been_completed_by_user?(user)
    # check if user has participated to poll

    puls = self.poll_user_links

    if !puls.blank?
      puls.each do |pul|
        return true if pul.user == user
      end
    end

    return false
  end

end

