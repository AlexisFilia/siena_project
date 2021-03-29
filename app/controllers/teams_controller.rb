class TeamsController < ApplicationController
  def show
    @team_members = @team.users
  end

  def index
    @teams = current_user.company.teams
  end
end
