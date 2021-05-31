class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :contact, :tim_tests ]

  def home

    if user_signed_in?
      redirect_to levels_path
    end

    @primary = 1
  end

  def contact

    @primary = 2
  end

  def tim_tests
  end

end
