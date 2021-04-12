class MediaController < ApplicationController
  before_action :media_params

  def create



    if @media_params[:perimeter].nil?

    else

      message = Message.create!(user: current_user, perimeter: @media_params[:perimeter], type_of: "media")
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
