class RoulettesController < ApplicationController

  def handle_roulette_result

    quest = Quest.find(params[:quest])
    roulette = params[:roulette]
    obj_id = params[:id]

    tql = TeamQuestLink.find_by(team: @team, quest: quest)

    if tql.blank?
      TeamQuestLink.create!(team: @team, quest: quest, roulette_result: obj_id)
    else
      tql.update!(roulette_result: obj_id)
    end

    # pour vérifier qu´on recoit bien tout
    returned_hash = {r: roulette, i: obj_id}
    render json: returned_hash.to_json
  end


end


