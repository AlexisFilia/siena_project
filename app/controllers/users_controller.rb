class UsersController < ApplicationController
  def show

    @user = User.find(params[:id])
    #Evolutive elements------------------
    @top_bar_title = 'PROFILE'
  end

  def index
  end

  def edit

    #Evolutive elements------------------
    @top_bar_title = 'EDIT PROFILE'
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
