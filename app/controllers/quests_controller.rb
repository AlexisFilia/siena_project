class QuestsController < ApplicationController


  def show
    # @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    @quest = Quest.find(params[:id])
    @level = @quest.level
    @criteria = JSON.parse(@quest.criteria)
    @team_quest_link = TeamQuestLink.find_by(team: current_user.team, quest: @quest)
  end

  def index
    # @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    @level = Level.find(params[:level_id])
    @team = current_user.team
    @level_completion = @team.get_percentage_of_level_completion(@level)

    # on se crée un mapping des quetes en fonction du status du team_quest_link de l´equipe
    @quests = @level.quests.map{|q| {quest: q , status: @team.get_quest_status(q)}}
  end

end



