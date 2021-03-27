class UsersController < ApplicationController
  def show
  end

  def index
  end

  def edit

  end

  def update
    current_user.update!(user_params)
    redirect_to user_path(current_user)
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :description, :photo)
  end
end
