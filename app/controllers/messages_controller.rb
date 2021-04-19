class MessagesController < ApplicationController

  def show
  end

  def index
    # raise
    # @sideNav_id = 7; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js
    @initial_perimeter = params[:perimeter].nil? ? 'team' : params[:perimeter]
    params[:perimeter] = @initial_perimeter # pour l´avoir dans l´url

    # Question ouverte : pourquoi pas une fonction dans le modele messages pour choper un array de hash avec des infos plus poussées sur les messages
    # histoire de limiter les requetes dans la view?

    @message = Message.new()
    @medium = Medium.new()

    if @initial_perimeter == 'team'

      @messages = Message.joins(:user)
                              .where(perimeter: 'team')
                              .where(users: { team_id: @team.id })
                              .order('created_at ASC')
                              .limit(50)
      # params[:anchor] = "message-#{@messages.last.anchor}"
    else
      @messages = Message.where(perimeter: 'public')
                                 .order('created_at ASC')
                                 .limit(50)
      # params[:anchor] = "message-#{@messages.last.anchor}"
    end


    #Evolutive elements------------------
    @top_bar_title = 'TCHAT'
    @etb_class = 'perimeter-choices tchat'
  end

  def create

    perimeter = params.require(:message).permit(:perimeter)[:perimeter]

    message = Message.create!({
                            user: current_user,
                            perimeter: perimeter,
                            type_of: 'standard',
                            value: params.require(:message).permit(:value)[:value],
                            message_ref: params.require(:message).permit(:message_ref)[:message_ref]
                          })
  #   unless params[:message][:url].blank? || params[:message][:type_of_media].blank?
  #     media = Media.define_media(params[:message][:url], params[:message][:type_of_media], message)
  #   end
    redirect_to messages_path(perimeter: perimeter)
  end



end





