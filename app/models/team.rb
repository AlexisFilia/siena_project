class Team < ApplicationRecord
  belongs_to :company

  has_many :users, dependent: :destroy
  has_many :messages, through: :users
  has_many :team_quest_links, dependent: :destroy
  has_many :quests, through: :team_quest_links

  validates :name, presence: true
  validates :name, uniqueness: {
    scope: :company,
    message: 'This company name already exists in the DB.'
  }



  def has_completed_quest?(quest)

    return self.get_quest_status(quest) == "completed" ? true : false #je crois que le self est ici inutile mais par soucis de compréhension je le garde

  end

  def get_quest_status(quest)
    tql = TeamQuestLink.find_by(team: self, quest: quest)
    return tql.nil? ? "open" : tql.status
  end

  def get_completed_quests(level = "all")
    # Retoune un array/ toutes les quetes accomplies par une équipe - si un niveau est précisé, retourne les quetes accomplies du niveau
    team_completed_tql = TeamQuestLink.where(team: self, status: "completed")

    if team_completed_tql.empty?
      return []
    elsif level == "all"
      return team_completed_tql.map{|tql| tql.quest}
    else
      return team_completed_tql.map{|tql| tql.quest}.select{ |q| q.level == level}
    end

    # return team_completed_tql.empty? ? [] : team_completed_tql.map{|tql| tql.quest}
  end

  def get_fgf

    # Besoin d´une jolie query d´Alex

    team_players = self.users
    team_players.each do |player|
      player_roles = player.roles.map{|role| role.name}
      return player if player_roles.include?('feelgoodfellow')
    end

    return nil
  end


  def get_level

    team_level = Level.first # pb de la logique avec next_level_id

    team_completed_quests = self.get_completed_quests

    if !team_completed_quests.empty?
      levels = Level.all

      #determine highest level of quest achieved by the team
      highest_level = team_completed_quests.max {|a,b| a.level.id <=> b.level.id }.level # pb de la logique avec next_level_id

      #check if all mandatory are done in this level and allocate team_level accordingly
      highest_level_quests = highest_level.quests
      team_level = highest_level

      highest_level_quests.each do |quest|
        return team_level if !self.has_completed_quest?(quest)
      end

      # if not returned in the loop above, it means all quests have been done and the team is one level above
      team_level = Level.find(team_level.next_level_id)
    end

    # we return the value and if nothing out of above logic we return the first level
    return team_level
  end


  def get_percentage_of_level_completion(level)
    # retourne un hash de la forme : {total: float, mandatory: float, optional: float} (plus intéressant d´avoir tout en une query vers la db)
    team_percentage_of_level_completion = "-"
    team_mandatory_percentage_of_level_completion = "-"
    team_optional_percentage_of_level_completion = "-"
    returned_hash = {total: team_percentage_of_level_completion,
                      mandatory: team_mandatory_percentage_of_level_completion,
                      optional: team_optional_percentage_of_level_completion}

    level_quests = level.quests
    return returned_hash if level_quests.empty?
    level_mandatory_quests = level_quests.select{ |q| q.type_of == "mandatory"}
    level_optional_quests = level_quests.select{ |q| q.type_of == "optional"}

    team_completed_level_quests = self.get_completed_quests(level)
    team_completed_level_mandatory_quests = team_completed_level_quests.empty? ? [] : team_completed_level_quests.filter{ |q| q.type_of == "mandatory"}
    team_completed_level_optional_quests = team_completed_level_quests.empty? ? [] : team_completed_level_quests.filter{ |q| q.type_of == "optional"}

    team_percentage_of_level_completion = team_completed_level_quests.count.to_f / level_quests.count.to_f
    team_mandatory_percentage_of_level_completion = team_completed_level_mandatory_quests.count.to_f / level_mandatory_quests.count.to_f unless level_mandatory_quests.empty?
    team_optional_percentage_of_level_completion = team_completed_level_optional_quests.count.to_f / level_optional_quests.count.to_f unless level_optional_quests.empty?

    # 3 stars = All Quests done
    # 2 stars = All mandatory quests done
    # 1 star = 1 Quest done
    if team_percentage_of_level_completion == 1
      stars_amount = 3
    elsif team_mandatory_percentage_of_level_completion == 1
      stars_amount = 2
    elsif team_percentage_of_level_completion > 0
      stars_amount = 1
    else
      stars_amount = 0
    end

    returned_hash = {total: team_percentage_of_level_completion,
                      mandatory: team_mandatory_percentage_of_level_completion,
                      optional: team_optional_percentage_of_level_completion,
                      stars: stars_amount
                    }



    return returned_hash

  end

  def get_rank

    # compare les total_points de toutes les équipes et retourne le rang

    my_rank = 1 # assigne 1 de base
    my_points = self.get_total_points

    # crée un array avec les teams
    teams = Team.all

    teams.each do |team|
      my_rank += 1 if team != self && team.get_total_points > my_points # on aura le meme rank minimum ex aeco
    end

    return my_rank

  end

  def get_total_points
    # cummule les points stockés en dur dans la team
    return self.points_level + self.points_optional + self.points_votes
  end

  def update_points(action)
    # truc qui devrait se trigger quand on vote (action = "vote"), quand on realise une quete (action = quete), quand on fait autre chose...
    # ca permettrait d´updater le score d´une team en dur dans la team et donc de calculer le ranking tres rapidement (et autres actions)
    # update points_level", "points_optional", "points_vote" et autres choses qu´on voudrait

    if action.class == Quest

      completed_quest = action

    # CAS LEVEL ------------------------------------------------------------------------------------
      if completed_quest.type_of == "mandatory"

        #choppe le level de la team
        team_level = self.get_level

        # definit le nombres de points en fonction
        points_level = 0
        (1..team_level.id).each do |counter|
          points_level += (counter * 100) # 100 + 200 + 300 + 400
        end

        self.update(points_level: points_level)

    # CAS OPTIONAL ------------------------------------------------------------------------------------
      elsif completed_quest.type_of == "optional"

        # compte le nombre de quetes optionnelles faites
        team_completed_optional_quests = self.get_completed_quests.select{ |q| q.type_of == "optional"} # forcément au moins une
        # defini le nombres de points en fonction
        self.update(points_optional: team_completed_optional_quests.count * 100)

      end

    # CAS VOTE ------------------------------------------------------------------------------------
    elsif action == "vote"
      # + 5 points / vote pour l´instant mais normalement on doit gérer avec le nombre de votes / equipe et tout
      self.update(points_votes: self.points_votes + 5)
    end

  end

end





