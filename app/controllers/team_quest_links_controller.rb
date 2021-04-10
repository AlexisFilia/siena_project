class TeamQuestLinksController < ApplicationController

  def index
    @validated_tqls = TeamQuestLink.joins(:team)
                                   .where(status: 'completed')
                                   .where(teams: { company_id: current_user.company.id })
                                   .order('created_at DESC')
  end

  def update
    tql = TeamQuestLink.find(params[:id])
    tql.update!(status: 'pending')
    redirect_to level_quests_path(tql.quest.level)
  end
end

