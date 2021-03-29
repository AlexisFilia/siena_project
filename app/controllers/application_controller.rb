class ApplicationController < ActionController::Base
  before_action :authenticate_user!, :load_team_main_variables

  def load_team_main_variables

    if current_user
      @team = current_user.team
      @team_current_level = @team.get_level
      @team_current_level_completion = @team.get_percentage_of_level_completion(@team_current_level)
    end
  end
end
