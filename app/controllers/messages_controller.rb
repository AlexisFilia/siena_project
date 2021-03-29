class MessagesController < ApplicationController

  def show
  end

  def index
    @sideNav_id = 7; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    @message = Message.new()

    @general_messages = Message.where(type_of: 'general')
                               .order('created_at ASC')
                               .limit(50)

    @team_messages = Message.joins(:user)
                            .where(type_of: 'team')
                            .where(users: { team_id: @team.id })
                            .order('created_at ASC')
                            .limit(50)
  end

  def create
    Message.create!(user: current_user, type_of: params[:type_of], value: params.require(:message).permit(:value)[:value])
    redirect_to messages_path
  end


end

