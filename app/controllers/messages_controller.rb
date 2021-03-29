class MessagesController < ApplicationController
  before_action :load_team_main_variables

  def show
  end

  def index
    @message = Message.new()

    @general_messages = Message.where(type_of: 'general')
                               .order('created_at ASC')
                               .limit(50)

    @team_messages = Message.joins(:user)
                            .where(type_of: 'team')
                            .where(users: { team_id: current_user.team.id })
                            .order('created_at ASC')
                            .limit(50)
  end

  def create
    Message.create!(user: current_user, type_of: params[:type_of], value: params.require(:message).permit(:value)[:value])
    redirect_to messages_path
  end


  private

  def load_team_main_variables
    @team = current_user.team
    @team_current_level = @team.get_level
    @team_current_level_completion = @team.get_percentage_of_level_completion(@team_current_level)
  end

end
