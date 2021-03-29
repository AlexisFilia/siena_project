class TeamQuestLinksController < ApplicationController
  def index
    @validated_tqls = TeamQuestLink.joins(:team)
                                   .where(status: 'completed')
                                   .where(teams: { company_id: current_user.company.id })
                                   .order('created_at DESC')
  end
end
