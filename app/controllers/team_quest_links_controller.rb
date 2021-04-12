class TeamQuestLinksController < ApplicationController


  def index
     @initial_perimeter = params[:perimeter].nil? ? "public" : params[:perimeter]




    if @initial_perimeter == "team"

      @validated_tqls = TeamQuestLink.where(status: 'completed')
                                   .where(team: @team)
                                   .order('updated_at DESC')

    else
      @validated_tqls = TeamQuestLink.where(status: 'completed')
                                    .order('updated_at DESC')
    end

    @medium_placeholder = "https://images.pexels.com/photos/1047285/pexels-photo-1047285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

    #Evolutive elements------------------
    @top_bar_title = "GALLERY"
    @etb_class = "perimeter-choices gallery"
  end

  def fetch_gallery_modal_content

    tql = TeamQuestLink.find(params["id"])
    tql_data_hash = {team: tql.team.name, quest: tql.quest.name}

    render json: tql_data_hash.to_json
  end

end

