class PollsController < ApplicationController

  def show
    @poll = Poll.find(params[:id])
    @poll_options = @poll.get_options_with_votes
    pp @poll_options

    #Evolutive elements------------------
    @top_bar_title = "POLL RESULTS"
  end

  def new

    # on devrait faire passer ca dans le lien vers la création d´un poll selon si on était dans le tchat public ou privé
    @initial_perimeter = params[:initial_perimeter].nil? ? "team" : params[:initial_perimeter]

    @poll = Poll.new

    #Evolutive elements------------------
    @top_bar_title = "POLL"
    @etb_class = "perimeter-choices"

  end

  def create

    p_params = poll_params

    message = Message.create!(user: current_user, perimeter: p_params[:perimeter], type_of: "poll")
    poll = Poll.new(name: p_params[:name], description: p_params[:description])
    poll.message = message
    poll.type_of = "standard" # ON POURRAIT FAIRE UN POLL A DUREE LIMITEE DANS LE TEMPS.... POUR LINSTANT UN SEUL TYPE

    if poll.save!

      options = params[:options]
      options.keys.each do |key|
        option = Option.new(poll: poll, description: options[key])
        option.save!
      end

      redirect_to new_poll_poll_user_link_path(poll)

    else
      render :new
    end

  end

  def edit
  end

  def update
  end

  def delete
  end

  private

  def poll_params
    params.require(:poll).permit(:name, :description, :perimeter)
  end


end



