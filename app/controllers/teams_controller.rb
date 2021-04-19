class TeamsController < ApplicationController
  def show
    @team_show = Team.find(params[:id])

    @team_members = @team_show.users

    @fgf = @team_show.get_fgf
    @completed_quests = @team_show.get_completed_quests

    #Evolutive elements------------------
    @top_bar_title = @team_show.name.upcase
  end

  def index
    @teams = indexed_teams

    #Evolutive elements------------------
    @top_bar_title = 'SCORES'
  end

  private

  def indexed_teams
    # je fais cette methode pour pas faire trop de requetes pour chaque equipe

    teams = Team.all
    indexed_teams = []
    teams.each do |team|
      indexed_teams << {id: team.id, name: team.name, level: team.get_level.id, points: team.get_total_points.to_i}
    end

    indexed_teams.sort_by!{|team| team[:points]}.reverse!

    puts indexed_teams
    # je preserve l´aexeco
    rank = 0
    indexed_teams.each_with_index do |team, index|
      if index == 0 || indexed_teams[index -1][:points] != team[:points]
        rank += 1
        team[:rank] = rank
      else
        team[:rank] = rank
      end
    end
    return indexed_teams
  end
end



