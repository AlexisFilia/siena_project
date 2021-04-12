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

  def check_tql_status
    all_votes = self.votes
    company = self.company
    number_of_users = company.users.count
    #### Ne rien faire si on a moins de 20% des users qui ont voté ####
    return if all_votes.count < number_of_users / 5
    #### Si non, changer le status du team_quest_link ####
    if all_votes.where(vote: true).count > all_votes.count / 2
      self.update!(status: 'completed')
    else
      self.update!(status: 'rejected')
    end
  end
end
