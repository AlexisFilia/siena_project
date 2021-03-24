class VotesController < ApplicationController
  def index
  end

  def new
    @tql_to_vote = TeamQuestLink.joins(:team)
                                .where(status: 'pending')
                                .where(teams: { company_id: current_user.company.id })
                                .joins(:votes)
                                .where.not(votes: { user_id: current_user })
                                .order("created_at ASC")
                                .first
  end

  def create
    raise
  end
end
