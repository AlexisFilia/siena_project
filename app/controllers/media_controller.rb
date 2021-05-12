class MediaController < ApplicationController
  # before_action :media_params

  def create

    @media_params = media_params

    if @media_params[:perimeter].nil?

      # dans le cas ou on crée un medium attaché à un teamQuestLink


      quest = Quest.find(params[:medium][:quest].to_i)
      tql = if params[:medium][:team_quest_link].blank?
              TeamQuestLink.create(team: current_user.team, quest: quest)
            else
              TeamQuestLink.find(params[:medium][:team_quest_link].to_i)
            end

      tql.update(status: 'draft')


      # optimize_medium_quality(params[:medium][:attached_file].tempfile.path)

      medium = Medium.new(team_quest_link: tql, attached_file: params[:medium][:attached_file])
      # je remplace tous les "medium.type_of" par medium.attached_file.content_type
      # medium = Medium.new(team_quest_link: tql, attached_file: params[:medium][:attached_file], type_of: params[:medium][:attached_file].content_type)


      if medium.save!
        redirect_to quest_path(quest)
      end



    else

      # dans le cas ou on crée un medium attaché à un message

      message = Message.create!(user: current_user, perimeter: @media_params[:perimeter], type_of: 'media')
      medium = Medium.new(message: message, attached_file: @media_params[:attached_file])
      # medium = Medium.new(message: message, attached_file: @media_params[:attached_file], type_of: @media_params[:attached_file].content_type)
      if medium.save!
        redirect_to messages_path(perimeter: @media_params[:perimeter])
      end
    end
  end

  def destroy
    @medium = Medium.find(params[:id])
    @quest = @medium.team_quest_link.quest
    @medium.destroy
    redirect_to quest_path(@quest)
  end

  private

  def media_params
    params.require(:medium).permit(:perimeter, :attached_file)

  end


  def optimize_medium_quality(medium_path)
    image = MiniMagick::Image.new(medium_path) # Ca overwrite direct le tempfile
    # image.resize "10%"

    # raise
    image.strip
    image.write(params[:medium][:attached_file].tempfile.path)
  end
end
