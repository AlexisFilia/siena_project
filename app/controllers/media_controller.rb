class MediaController < ApplicationController

  def create

    m_params = media_params

    if m_params[:perimeter].nil?
      quest = Quest.find(params[:medium][:quest].to_i)
      if params[:medium][:team_quest_link].blank?
        tql = TeamQuestLink.create(team: current_user.team, quest: quest)
      else
        tql = TeamQuestLink.find(params[:medium][:team_quest_link].to_i)
      end
      medium = Medium.new(team_quest_link: tql, attached_file: m_params[:attached_file], type_of: m_params[:attached_file].content_type)
      if medium.save!
        redirect_to level_quests_path(quest.level)
      end
    else
      message = Message.create!(user: current_user, perimeter: m_params[:perimeter], type_of: "media")
      medium = Medium.new(message: message, attached_file: m_params[:attached_file], type_of: m_params[:attached_file].content_type)
      if medium.save!
        redirect_to messages_path(perimeter: m_params[:perimeter], anchor: message.anchor)
      end
    end
  end

  private

  def media_params
    params.require(:medium).permit(:perimeter, :attached_file)
  end

end
