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
    if (!self.date_submission.friday? && Time.now - self.date_submission > 1.day) || (self.date_submission.friday? && Time.now - self.date_submission > 3.day)
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

    votes = self.votes.sort_by{|v| v.vote.to_s}

    return {total: votes.count, yes: votes.select{|v| v.vote == true}.count, no: votes.select{|v| v.vote == false}.count, votes: votes}
  end


  def get_roulette_result
    # n' est appelé que sur les quêtes qui ont un roulette_type
    quest = self.quest
    team = self.team
    roulette_type = quest.roulette_type

    # Si pas déjà tirée, la tire, stock le résultat et retourne le résultat
    unless self.roulette_result
      roulette_result = self.launch_roulette(team, roulette_type)
      self.update!(roulette_result: roulette_result)
    end

    # Détermine l' objet à retourner en fonction du roulette_type et de son id
    if roulette_type == "teams"
      roulette_result = Team.find(@team_quest_link.roulette_result)
    else
      roulette_result = User.find(@team_quest_link.roulette_result)
    end

    return roulette_result
  end

  def launch_roulette(team, roulette_type)
    # retourne l' id d' une equipe ou d' un user en fonction du roulette_type
    # on ne prend pas en compte ce qui a déjà été obtenu comme résultat des quetes précédentes (à discuter, option 1 : on peut lancer la roulette à l' infini, option 2: on a plus de diversité)

    case roulette_type
      when "teams"
        # array avec toutes les équipes sauf la mienne
        teams = Team.all
        roulette_array = teams.select{|t| t != team}
      when "players"
        # Un array avec touls les joueurs des autres équipes
        roulette_array = User.where.not(team: team) #les admins qui jouent pas sont inclus pour l' instant!
      when "team_players"
        # Un des joueurs de mon équipe
        roulette_array =  User.where(team: team)
    end

    roulette_result = roulette_array.sample.id
    return roulette_result
  end

end
