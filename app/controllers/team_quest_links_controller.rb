class TeamQuestLinksController < ApplicationController


  def index
     @initial_perimeter = params[:perimeter].nil? ? 'public' : params[:perimeter]


    if @initial_perimeter == 'team'

      @validated_tqls = TeamQuestLink.where(status: 'completed')
                                   .where(team: @team)
                                   .order('updated_at DESC')

      @first_column = []
      @second_column = []
      @validated_tqls.each_with_index do |tql, index|
        if index % 2 == 0
          @second_column << tql
        else
          @first_column << tql
        end
      end

    else
      @validated_tqls = TeamQuestLink.where(status: 'completed')
                                    .order('updated_at DESC')

      @first_column = []
      @second_column = []
      @validated_tqls.each_with_index do |tql, index|
        if index % 2 == 0
          @first_column << tql
        else
          @second_column << tql
        end
      end
    end

    @medium_placeholder = 'https://images.pexels.com/photos/1047285/pexels-photo-1047285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

    #Evolutive elements------------------
    @top_bar_title = 'GALLERY'
    @etb_class = 'perimeter-choices gallery'
  end


  def update
    tql = TeamQuestLink.find(params[:id])
    tql.update!(status: 'pending')
    redirect_to level_quests_path(tql.quest.level)
  end


  def fetch_team_quest_link_content_for_modals

    tql = TeamQuestLink.find(params['id'])

    media = []

    tql.media.each do |medium|
      if medium.type_of == "video/mp4"
        media << {url: Cloudinary::Utils.cloudinary_url(medium.attached_file.key).gsub('/image/upload/', '/video/upload/c_pad/f_auto/'), type: "video"}
      else
        media << {url: Cloudinary::Utils.cloudinary_url(medium.attached_file.key), type: "image"}
      end
    end

    tql_data_hash = {team: tql.team.name, quest: tql.quest.name, media: media}

    render json: tql_data_hash.to_json
  end
end

