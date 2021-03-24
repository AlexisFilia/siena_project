class LevelsController < ApplicationController


  def show
  end

  def index
    @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    @levels = Level.all
  end


end

