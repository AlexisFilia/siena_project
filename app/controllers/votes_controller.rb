class VotesController < ApplicationController

  def index
  end

  def new
    @vote = Vote.new

    @all_tql_to_vote = TeamQuestLink.joins(:team)
                                .where(teams: { company_id: current_user.company.id })
                                .where.not(team_id: current_user.team.id)
                                .where(status: 'pending')
                                .where.not(id: TeamQuestLink.joins(:team)
                                                            .where(teams: { company_id: current_user.company.id })
                                                            .where.not(team_id: current_user.team.id)
                                                            .where(status: 'pending')
                                                            .joins(:votes)
                                                            .where(votes: { user_id: current_user.id })
                                                            .pluck('team_quest_links.id'))
                                .order('created_at ASC')



    @tql_to_vote_amount = @all_tql_to_vote.count
    @tql_to_vote = @all_tql_to_vote.first


    unless @tql_to_vote.blank?
      @quest = @tql_to_vote.quest
      @criteria = JSON.parse(@tql_to_vote.quest.criteria)
      @roulette_type = @quest.roulette
    end

    if !@roulette_type.nil?
      @roulette_result = @tql_to_vote.get_roulette_result
    end


    #Evolutive elements------------------
    @top_bar_title = 'VALIDATION'


  end

  def create
    # raise
    tql = TeamQuestLink.find(params[:vote][:tql].to_i)
    vote = Vote.new(vote_params)
    vote.user = current_user
    vote.team_quest_link = tql
    vote.criteria = Vote.define_criteria(params, tql).to_json

    if vote.save!
      tql.check_and_update_tql_status_from_votes
      @team.update_points('vote')
      redirect_to new_vote_path
    else
      render :new
    end

  end

  def swipe_vote
    tql = TeamQuestLink.find(params[:tql])
    vote = Vote.new(vote: params[:vote])
    vote.user = current_user
    vote.team_quest_link = tql

    if vote.save!
      tql.check_and_update_tql_status_from_votes
      @team.update_points('vote')
      returned_hash = {message: 'ok'}
      render json: returned_hash.to_json
      # render :js => "console.log('xoxoxoxo'); window.location.reload();"
    else
      # render :new
      returned_hash = {message: "Je n´ai pas sauvé ton vote"}
      render json: returned_hash.to_json
    end


  end

  private

  def vote_params
    params.require(:vote).permit(:vote)
  end


end

