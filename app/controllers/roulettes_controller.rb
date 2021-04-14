class RoulettesController < ApplicationController

  def handle_roulette_result

    roulette = params[:roulette]
    item_index = params[:index]

    # pour vérifier qu´on recoit bien tout
    returned_hash = {r: roulette, i: item_index}
    render json: returned_hash.to_json
  end


end
