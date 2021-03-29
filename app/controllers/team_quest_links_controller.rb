class TeamQuestLinksController < ApplicationController
  before_action :load_team_main_variables

  def index
    @validated_tqls = TeamQuestLink.joins(:team)
                                   .where(status: 'completed')
                                   .where(teams: { company_id: current_user.company.id })
                                   .order('created_at DESC')
  end


  def load_team_main_variables
    @team = current_user.team
    @team_current_level = @team.get_level
    @team_current_level_completion = @team.get_percentage_of_level_completion(@team_current_level)
  end
end

