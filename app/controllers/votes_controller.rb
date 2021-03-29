class VotesController < ApplicationController
  before_action :load_team_main_variables

  def index
  end

  def new
    @tql_to_vote = TeamQuestLink.joins(:team)
                                .where(teams: { company_id: current_user.company.id })
                                .where(status: 'validation')
                                .left_outer_joins(:votes)
                                .where.not(votes: { user_id: current_user.id })
                                .or(TeamQuestLink.left_outer_joins(:votes)
                                                 .where(votes: { user_id: nil}))
                                .order('created_at ASC')
                                .first
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

  private

  def load_team_main_variables
    @team = current_user.team
    @team_current_level = @team.get_level
    @team_current_level_completion = @team.get_percentage_of_level_completion(@team_current_level)
  end

end
