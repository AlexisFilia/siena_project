class MediaController < ApplicationController

  def create
    # raise
    m_params = media_params

    if m_params[:perimeter].nil?

    else
      message = Message.create!(user: current_user, perimeter: m_params[:perimeter], type_of: "media")
      medium = Medium.new(message: message, attached_file: m_params[:attached_file])
      if medium.save!
        redirect_to messages_path
      end
    end
  end

  private

  def media_params
    params.require(:medium).permit(:perimeter, :attached_file)
  end

end
