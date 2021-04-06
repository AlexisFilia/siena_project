class PollUserLinksController < ApplicationController



  def show
  end

  def index
  end

  def new
    @poll = Poll.find(params[:poll_id])

    redirect_to poll_path(@poll) if @poll.has_been_completed_by_user?(current_user)

    @pul = PollUserLink.new
    @poll_options = @poll.options
  end

  def create

    poll = Poll.find(params[:poll_id])
    pul = PollUserLink.new
    pul.poll = poll
    pul.user = current_user
    pul.option = Option.find(params[:poll_user_link][:option])

    if pul.save!
      redirect_to poll_path(poll)
    else
      render :new
    end

  end



end

