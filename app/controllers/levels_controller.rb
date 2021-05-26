class LevelsController < ApplicationController

  def index
    # @sideNav_id = 1; # utilise ca pour ajouter la classe "active" au lien de la navbar correspondant - voir le sideNav.html.erb et le js

    @levels = []
    Level.all.each do |l|
      if l.id > @team_current_level.id # locked
        @levels << {level: l}
      else
        level_completion = @team.get_percentage_of_level_completion(l)
        @levels << {level: l, mandatory_completion: level_completion[:mandatory],  optional_completion: level_completion[:optional], stars: level_completion[:stars]}
      end
    end


    #Evolutive elements------------------
    @top_bar_title = 'LEVELS'

  end

  def show


  end


end



