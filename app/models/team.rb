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


  def get_level

    team_level = Level.first
    team_completed_quests = self.get_completed_quests

    if !team_completed_quests.empty?
      levels = Level.all

      #determine highest level of quest achieved by the team
      highest_level = team_completed_quests.max {|a,b| a.level.id <=> b.level.id }.level

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

    returned_hash = {total: team_percentage_of_level_completion,
                      mandatory: team_mandatory_percentage_of_level_completion,
                      optional: team_optional_percentage_of_level_completion}

    return returned_hash

  end

  def get_rank

    # compare les total_points de toutes les équipes et retourne le rang

  end

  def get_total_points
    # cummule les points stockés en dur dans la team
  end

  def update_points(action)
    # truc qui devrait se trigger quand on vote (action = "vote"), quand on realise une quete (action = quete), quand on fait autre chose...
    # ca permettrait d´updater le score d´une team en dur dans la team et donc de calculer le ranking tres rapidement (et autres actions)
    # update points_level", "points_optional", "points_vote" et autres choses qu´on voudrait
  end


end

