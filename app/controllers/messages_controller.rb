class MessagesController < ApplicationController
  respond_to :html, :json, :js
  before_action :up_page, only: :index

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
                         .paginate(page: @page, per_page: 15)
                         .order('created_at DESC')
      # params[:anchor] = "message-#{@messages.last.anchor}"
    else
      @messages = Message.where(perimeter: 'public')
                         .paginate(page: @page, per_page: 15)
                         .order('created_at DESC')
      # params[:anchor] = "message-#{@messages.last.anchor}"
    end

    #Evolutive elements------------------
    @top_bar_title = 'TCHAT'
    @etb_class = 'perimeter-choices tchat'

    @messages
    respond_to do |f|
      f.js { render layout: false, content_type: 'text/javascript' }
      f.html
    end
  end

  def load_more_messages
    # @initial_perimeter = params[:perimeter].nil? ? 'team' : params[:perimeter]
    # params[:perimeter] = @initial_perimeter
    # if @initial_perimeter == 'team'

    #   @messages = Message.joins(:user)
    #                      .where(perimeter: 'team')
    #                      .where(users: { team_id: @team.id })
    #                      .paginate(page: params[:page], per_page: 15)
    #                      .order('created_at DESC')
    #   # params[:anchor] = "message-#{@messages.last.anchor}"
    # else
    #   @messages = Message.where(perimeter: 'public')
    #                      .paginate(page: params[:page], per_page: 15)
    #                      .order('created_at DESC')
    #   # params[:anchor] = "message-#{@messages.last.anchor}"
    # end
    # render json: @messages
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

  private

  def up_page
    @page = if params[:new_req].blank?
              1
            else
              @page + 1
            end
  end
end






