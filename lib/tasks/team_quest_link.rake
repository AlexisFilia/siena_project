namespace :team_quest_link do
  desc "Check if the pending team_quest_link are now older than 24h"
  task check_age: :environment do
    all_pending_tql = TeamQuestLink.where(status: 'pending')
    all_pending_tql.each do |tql|
      if tql.created_at > 1.day.ago
        if tql.votes.where(vote: true).count > tql.votes.count / 2
          tql.update!(status: 'completed')
        else
          tql.update!(status: 'rejected')
        end
      end
    end
  end
end
