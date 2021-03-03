class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :tim_tests ]

  def home
  end

  def tim_tests
  end

end
