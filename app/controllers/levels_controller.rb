class LevelsController < ApplicationController


  def index

    @team = current_user.team
    @team_level =  @team.get_level
    @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    #dommage d´appeler 2 fois la fonction en dessous sachant qu´elle file toutes les infos en une fois - et de l´appeler pour les levels qui sont pas débloqués
    # je pourrai faire les calculs dans le vue... à discuter
    @levels = Level.all.map{|l| {level: l, mandatory_completion: @team.get_percentage_of_level_completion(l)[:mandatory],  optional_completion: @team.get_percentage_of_level_completion(l)[:optional]}}

  end

  def show
    @level = Level.find(params[:id])
    @team = current_user.team

    # on se crée un mapping des quetes en fonction du status du team_quest_link de l´equipe
    @quests = @level.quests.map{|q| {quest: q , status: @team.get_quest_status(q)}}

  end




  private

  # je garde ca là le temps de voir si ca marche en migrant tout dans le modele "Team" - à virer après 3 mois de dev si c´est encore là

  # def get_team_level(team)
  #   team_level = Level.first
  #   team_completed_tql = TeamQuestLink.where(team: team, status: "completed")

  #   if !team_completed_tql.empty?
  #     team_completed_quests = team_completed_tql.map{|tql| tql.quest}
  #     levels = Level.all

  #     #determine highest level of quest achieved by the team
  #     highest_level = team_completed_quests.max {|a,b| a.level.id <=> b.level.id }.level

  #     #check if all mandatory are done in this level and allocate team_level accordingly
  #     highest_level_quests = highest_level.quests
  #     team_level = highest_level

  #     highest_level_quests.each do |quest|
  #       return team_level if !team_has_completed_quest?(team, quest)
  #     end

  #     # if not returned in the loop above, it means all quests have been done and the team is one level above
  #     team_level = Level.find(team_level.next_level_id)
  #   end

  #   # we return the value and if nothing out of above logic we return the first level
  #   return team_level

  # end

  # def team_has_completed_quest?(team, quest)

  #   return get_team_quest_status(team, quest) == "completed" ? true : false

  # end

  # def get_team_quest_status(team, quest)
  #   tql = TeamQuestLink.find_by(team: team, quest: quest)
  #   return tql.nil? ? "open" : tql.status
  # end

  # def team_percentage_of_level_completion(team, level, quest_type = "all")
  #   # RETURNS THE PERCENTAGE OF COMPLETION FOR ALL, MANDATORY OR OPTIONAL QUESTS OF GIVEN LEVEL -- RETURNS "-" IF NO QUEST OF SUCH TYPE

  #   level_quest_type_quests_amount = quest_type == "all" ? level.quests.count : level.quests.select{|q| q.type_of == quest_type}.count
  #   return "-" if level_quest_type_quests_amount == 0

  #   team_completed_tql = TeamQuestLink.where(team: team, status: "completed")

  #   if !team_completed_tql.empty?

  #     team_completed_level_tql = team_completed_tql.select{|tql| tql.quest.level == level }

  #     if !team_completed_level_tql.empty? && quest_type != "all" # si on a selectionné "Mandatory" ou "Optional" alors on check là dedans
  #       team_completed_level_quest_type_quests_amount = team_completed_level_tql.select{ |tql| tql.quest.type_of == quest_type}.count

  #       return team_completed_level_quest_type_quests_amount.to_f / level_quest_type_quests_amount.to_f
  #     end

  #     return team_completed_level_tql.count.to_f / level_quest_type_quests_amount.to_f
  #   end

  #   return 0

  # end


end



