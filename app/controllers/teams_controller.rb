class TeamsController < ApplicationController
  def show
    @team_members = @team.users

    #Evolutive elements------------------
    @top_bar_title = @team.name.upcase
  end

  def index
    @teams = current_user.company.teams

    #Evolutive elements------------------
    @top_bar_title = "SCORES"
  end
end
