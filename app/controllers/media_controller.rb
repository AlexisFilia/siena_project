class MediaController < ApplicationController
  before_action :media_params

  def create

    if @media_params[:perimeter].nil?

      quest = Quest.find(params[:medium][:quest].to_i)
      tql = if params[:medium][:team_quest_link].blank?
              TeamQuestLink.create(team: current_user.team, quest: quest)
            else
              TeamQuestLink.find(params[:medium][:team_quest_link].to_i)
            end
      medium = Medium.new(team_quest_link: tql, attached_file: params[:medium][:attached_file], type_of: params[:medium][:attached_file].content_type)
      if medium.save!
        redirect_to quest_path(quest)
      end

    else

      message = Message.create!(user: current_user, perimeter: @media_params[:perimeter], type_of: 'media')
      medium = Medium.new(message: message, attached_file: @media_params[:attached_file], type_of: @media_params[:attached_file].content_type)
      if medium.save!
        redirect_to messages_path(perimeter: @media_params[:perimeter])
      end
    end
  end

  private

  def media_params
    @media_params = params.require(:medium).permit(:perimeter, :attached_file)

  end
end
