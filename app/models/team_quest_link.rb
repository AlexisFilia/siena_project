class TeamQuestLink < ApplicationRecord
  belongs_to :team
  belongs_to :quest

  has_many :votes
  has_many :media
  has_many :likes
  has_one :level, through: :quest
  has_one :company, through: :team
  has_many :quest_tag_links, through: :quest
  has_many :tags, through: :quest_tag_links

  validates :team, uniqueness: {
    scope: :quest,
    message: 'Ce Team Quest Link existe déjà.'
  }

  def check_and_update_tql_status_from_votes
    all_votes = self.votes
    company = self.company
    number_of_users = company.users.count
    #### Ne rien faire si on a moins de 20% des users (excluant l'equipe qui a submit le tql) qui ont voté ####
    return if all_votes.count < (number_of_users - self.team.users.count) / 5
    #### Si non, changer le status du team_quest_link ####
    self.update_tql_status(all_votes)
  end

  def check_and_update_tql_status_from_time
    if (!self.created_at.friday? && self.created_at > 1.day) || (self.created_at.friday? && self.created_at > 3.day)
      self.update_tql_status(self.votes)
    end
  end

  def update_tql_status(all_votes)
    if all_votes.where(vote: true).count > all_votes.count / 2
      self.update!(status: 'completed')
      self.team.update_points(self.quest)
    else
      self.update!(status: 'rejected')
    end
  end


  def get_votes_result

    votes = self.votes.sort_by{|v| v.vote}

    return {total: votes.count, yes: votes.select{|v| v.vote == true}.count, no: votes.select{|v| v.vote == false}.count, votes: votes}
  end

end
