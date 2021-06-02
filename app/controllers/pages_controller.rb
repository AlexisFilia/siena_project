class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :tim_tests ]

  def home

    if user_signed_in?
      redirect_to levels_path
    end

    @primary = 1
  end

  def tim_tests
  end

end
