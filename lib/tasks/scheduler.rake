desc "Check if the pending team_quest_link are now older than 24h, This task is called by the Heroku scheduler add-on"
task :check_quest_age => :environment do
  all_pending_tql = TeamQuestLink.where(status: 'pending')
  all_pending_tql.each do |tql|
    tql.check_and_update_tql_status_from_time
  end
end
