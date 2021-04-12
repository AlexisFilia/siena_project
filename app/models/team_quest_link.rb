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

  # OBJECTIF : Centralisation de la gestion de la validation des tql ici
  #chron_tql_check_and_update (avec en commentaire là où le chro se declenche - lib/tasks/chron_tql_check_and_update.rake )
  #vote_tql_check_and_update
  #3eme avec probablement des points communs entre les deux

  def check_tql_status
    all_votes = self.votes
    company = self.company
    number_of_users = company.users.count
    #### Ne rien faire si on a moins de 20% des users qui ont voté ####
    return if all_votes.count < number_of_users / 5
    #### Si non, changer le status du team_quest_link ####
    if all_votes.where(vote: true).count > all_votes.count / 2
      self.update!(status: 'completed')
      self.team.update_points(self.quest)
    else
      self.update!(status: 'rejected')
    end
  end
end

