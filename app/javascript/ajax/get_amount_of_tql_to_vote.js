import { fetchWithToken } from "../utils/fetchWithToken";

const get_amount_of_tql_to_vote = (user_id) => {

  fetchWithToken("/fetch_amount_of_tql_to_vote", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ user_id: user_id})
    })
      .then(response => response.json())
      .then((data) => {console.log(data)});

}

export{get_amount_of_tql_to_vote};
