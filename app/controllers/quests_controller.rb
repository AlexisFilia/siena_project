class QuestsController < ApplicationController

  def index
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

    @quest = Quest.find(params[:id])
    @quest_status = @team.get_quest_status(@quest)
    @level = @quest.level
    @criteria = JSON.parse(@quest.criteria)


    @team_quest_link = TeamQuestLink.find_by(team: @team, quest: @quest)

    if @team_quest_link.blank?
      @team_quest_link_id =  nil
    else
      @team_quest_link_id = @team_quest_link.id
      @votes_result = @team_quest_link.get_votes_result
      @roulette_result = @team_quest_link.roulette_result
    end


    @roulette_type = @quest.roulette


    unless @roulette_result
      case @roulette_type
      when nil
      when "teams"
        @roulette_array = Team.all
      when "players"
        @roulette_array = User.all
      when "team_players"
        @roulette_array = User.all.select{|u| u.team != @team} # tous les joueurs des autres équipes !!! les admins qui jouent pas sont inclus pour l' instant!
      end
    end


    @medium = Medium.new()

    #Evolutive elements------------------
    @top_bar_title = "#{@level.id} - #{@level.name.upcase}"
    @etb_class = 'with-back-link'
    @back_route = level_quests_path(@level)
  end

end




