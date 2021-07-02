import { get_amount_of_tql_to_vote } from '../ajax/get_amount_of_tql_to_vote';


const update_tql_to_vote_amount = () => {

  get_amount_of_tql_to_vote(2);
}

export{update_tql_to_vote_amount};
