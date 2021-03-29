class LevelsController < ApplicationController

  def index
    @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    #dommage d´appeler 2 fois la fonction en dessous sachant qu´elle file toutes les infos en une fois - et de l´appeler pour les levels qui sont pas débloqués
    # je pourrai faire les calculs dans le vue... à discuter
    @levels = Level.all.map{|l| {level: l, mandatory_completion: @team.get_percentage_of_level_completion(l)[:mandatory],  optional_completion: @team.get_percentage_of_level_completion(l)[:optional]}}

    puts @team.update_points(Quest.first)
  end

  def show


  end


end



