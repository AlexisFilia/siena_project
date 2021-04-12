namespace :team_quest_link do
  desc "Check if the pending team_quest_link are now older than 24h"
  task check_age: :environment do
    all_pending_tql = TeamQuestLink.where(status: 'pending')
    all_pending_tql.each do |tql|
      if (!tql.created_at.friday? && tql.created_at > 1.day.ago) || (tql.created_at.friday? && tql.created_at > 3.day.ago)
        tql.update_tql_status(tql.votes)
      end
    end
  end
end
