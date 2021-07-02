import { get_amount_of_tql_to_vote } from '../ajax/get_amount_of_tql_to_vote';


const update_tql_to_vote_amount = () => {

  const currentUserId = 2;
  get_amount_of_tql_to_vote(currentUserId);

}

export{update_tql_to_vote_amount};
