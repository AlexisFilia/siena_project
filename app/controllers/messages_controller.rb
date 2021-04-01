class MessagesController < ApplicationController

  def show
  end

  def index
    # raise
    @sideNav_id = 7; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js
    @initial_perimeter = params[:perimeter].nil? ? "team" : params[:perimeter]

    # Question ouverte : pourquoi pas une fonction dans le modele messages pour choper un array de hash avec des infos plus poussées sur les messages
    # histoire de limiter les requetes dans la view?

    @message = Message.new()
    @media = Media.new()

    @public_messages = Message.where(type_of: 'public')
                               .order('created_at ASC')
                               .limit(50)

    @team_messages = Message.joins(:user)
                            .where(type_of: 'team')
                            .where(users: { team_id: @team.id })
                            .order('created_at ASC')
                            .limit(50)

    @user_picture = "https://images.pexels.com/photos/2880094/pexels-photo-2880094.jpeg?cs=srgb&dl=pexels-breston-kenya-2880094.jpg&fm=jpg"
  end

  def create

    perimeter = params.require(:message).permit(:type_of)[:type_of]

    message = Message.create!({
                            user: current_user,
                            type_of: perimeter,
                            value: params.require(:message).permit(:value)[:value],
                            message_ref: params.require(:message).permit(:message_ref)[:message_ref]
                          })
    unless params[:message][:url].blank? || params[:message][:type_of_media].blank?
      media = Media.define_media(params[:message][:url], params[:message][:type_of_media], message)
    end
    redirect_to messages_path(anchor: "message-#{message.id}", perimeter: perimeter)
  end
end


