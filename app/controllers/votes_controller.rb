class VotesController < ApplicationController

  def index
  end

  def new
    @tql_to_vote = TeamQuestLink.joins(:team)
                                .where(teams: { company_id: current_user.company.id })
                                .where(status: 'pending')
                                .left_outer_joins(:votes)
                                .where.not(votes: { user_id: current_user.id })
                                .or(TeamQuestLink.left_outer_joins(:votes)
                                                 .where(votes: { user_id: nil}))
                                .order('created_at ASC')
                                .first


    #Evolutive elements------------------
    @top_bar_title = "VALIDATION"
  end

  def create
    tql = TeamQuestLink.find(params[:tql])
    vote = Vote.new(vote_params)
    vote.user = current_user
    vote.team_quest_link = tql
    vote.save!
    redirect_to new_vote_path
  end

  private

  def vote_params
    params.permit(:criteria, :vote)
  end


end

