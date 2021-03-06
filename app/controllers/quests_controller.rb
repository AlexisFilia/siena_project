class QuestsController < ApplicationController

  def index
    redirect_to level_quests_path(@team_current_level) if params[:level_id].to_i > @team_current_level.id
    # @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js
    @level = Level.find(params[:level_id])
    # @team = current_user.team : déjà dans le application controller
    @level_completion = @team.get_percentage_of_level_completion(@level)

    # on se crée un mapping des quetes en fonction du status du team_quest_link de l´equipe
    @quests = @level.get_quests_list_ordered_by_status(@team)


    #Evolutive elements------------------
    @top_bar_title = "#{@level.id} - #{@level.name.upcase}"
    @etb_class = 'with-back-link'
    @back_route = levels_path

  end


  def show
    # @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js
    redirect_to level_quests_path(@team_current_level) unless Quest.accessible_quest?(params[:id], @team_current_level)

    @quest = Quest.find(params[:id])
    @quest_status = @team.get_quest_status(@quest)
    @level = @quest.level
    @criteria = JSON.parse(@quest.criteria)
    @roulette_type = @quest.roulette

    @team_quest_link = TeamQuestLink.find_by(team: @team, quest: @quest)

    if !@roulette_type.nil?
      # si j' ai un roulette_type mais pas de TQL je suis oblogé d' en créer un pour stocker le roulette_result
      @team_quest_link = TeamQuestLink.create!(team: @team, quest: @quest, status: "open") if @team_quest_link.blank?
      # demande le résultat de la roulette
      @roulette_result = @team_quest_link.get_roulette_result
    end


    if @team_quest_link.blank?
      @team_quest_link_id =  nil
    else
      @team_quest_link_id = @team_quest_link.id
      @votes_result = @team_quest_link.get_votes_result
    end


    @medium = Medium.new()

    #Evolutive elements------------------
    @top_bar_title = "#{@level.id} - #{@level.name.upcase}"
    @etb_class = 'with-back-link'
    @back_route = level_quests_path(@level)
  end

end





