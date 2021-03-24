class LevelsController < ApplicationController


  def show
  end

  def index
    @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js
    @levels = Level.all
    @user_team_level = get_team_level(current_user.team)
  end


  private

  def get_team_level(team)
    team_level = Level.first
    team_completed_tql = TeamQuestLink.where(team: team, status: "completed")

    if !team_completed_tql.empty?
      team_completed_quests = team_completed_tql.map{|tql| tql.quest}
      levels = Level.all

      #determine highest level of quest achieved by the team
      highest_level = team_completed_quests.max {|a,b| a.level.id <=> b.level.id }.level

      #check if all mandatory are done in this level and allocate team_level accordingly
      highest_level_quests = highest_level.quests
      team_level = highest_level

      highest_level_quests.each do |quest|
        return team_level if !team_has_completed_quest?(team, quest)
      end

      # if not returned in the loop above, it means all quests have been done and the team is one level above
      team_level = Level.find(team_level.next_level_id)
      return team_level
    end

    # if nothing out of that we return the first level
    return team_level

  end

  def team_has_completed_quest?(team, quest)

    return TeamQuestLink.find_by(team: team, status: "completed", quest: quest).nil? ? false : true
  end

end


