require 'json'

puts "Destroying previous DB"
User.destroy_all
Team.destroy_all
Company.destroy_all
puts "Previous DB has been destroyed"

puts "Creating a new seeded DB..."

puts "Creating a new company"
company = Company.create!(name: "Airbus Cyber", logo: "http://logok.org/wp-content/uploads/2014/09/Airbus-logo-3D_Blue-880x660.png")
puts "A new company has been created"

puts "Creating some teams"
team_1 = Team.create!(name: "Team1", company: company)
team_2 = Team.create!(name: "Team2", company: company)
team_3 = Team.create!(name: "Team3", company: company)
team_4 = Team.create!(name: "Team4", company: company)
team_5 = Team.create!(name: "Team5", company: company)
puts "Some teams have been created"

puts "Creating some users"
Team.all.each do |team|
  puts "Users for team #{team.id}"
  for i in 1..8 do
    User.create!(first_name: "Player#{i}", last_name: " for team #{team.id}", email: "#{team.id}player#{i}@airbus.com", password: "123456", team: team)
    User.create!(first_name: "Player#{i}test", last_name: " for team #{team.id}", email: "#{team.id}player#{i}@airbus.com2", password: "123456", team: team)
  end
end
puts "Some users have been created"

puts "Creating levels"

level_1 = Level.create!(name: "The Harbor", next_level_id: 2)
level_2 = Level.create!(name: "The High Seas", next_level_id: 3)
level_3 = Level.create!(name: "The Reefs", next_level_id: 4)
level_4 = Level.create!(name: "The Hallucinogenic Forest", next_level_id: 5)
level_5 = Level.create!(name: "The Desert", next_level_id: 6)
level_6 = Level.create!(name: "The Oasis", next_level_id: 7)
level_7 = Level.create!(name: "The Flying Rocks", next_level_id: 8)
level_8 = Level.create!(name: "Moonlike Peak", next_level_id: 9)
level_9 = Level.create!(name: "The Verdant Valley", next_level_id: 10)
level_10 = Level.create!(name: "The Black Forest", next_level_id: 11)
level_11 = Level.create!(name: "The Maze Canyon", next_level_id: 12)
level_12 = Level.create!(name: "The Frozen Lands", next_level_id: 13)
level_13 = Level.create!(name: "The Blizzard", next_level_id: 14)
level_14 = Level.create!(name: "The Golden Pinguin", next_level_id: 15)

puts "Levels have been created"

puts "Uploading some quests"

criteria_array = ["Validation criteria 1", "Validation criteria 2", "Validation criteria 3"]
criteria_json = criteria_array.to_json

quest_1 = Quest.create!(name: "Allumer la flamme", description: "5 membres de votre équipe doivent clicker sur le bateau!", type_of: "mandatory", roulette: "Non", level: level_1, criteria: criteria_json )
quest_2 = Quest.create!(name: "Élire votre FeelGoodFellow", description: "Vous devez voter pour votre Capitaine d´équipe! Pour valider la quete...", type_of: "mandatory", roulette: "Non", level: level_2, criteria: criteria_json)
quest_3 = Quest.create!(name: "Votre nom de tribu", description: "Vous devez voter pour votre nom de tribu! Pour valider la quete....", type_of: "mandatory", roulette: "Non", level: level_2, criteria: criteria_json )
quest_4 = Quest.create!(name: "Votre territoire", description: "Vous devez définir votre territoire! Pour valider la quete....", type_of: "mandatory", roulette: "Non", level: level_3, criteria: criteria_json )
quest_5 = Quest.create!(name: "Une petite collation", description: "Un membre de votre équipe doit amener le petit déjeuner pour les autres. Pour valider la quête, vous devez...", type_of: "mandatory", roulette: "Non", level: level_3, criteria: criteria_json )
quest_6 = Quest.create!(name: "FeelGoodPhoto", description: "Poster une photo de votre FeelGoodFellow! Pour valider la quête, vous devez...", type_of: "optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_7 = Quest.create!(name: "Qui es-tu", description: "Remplir votre profil en binome! Pour valider la quête, vous devez...", type_of: "optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_8 = Quest.create!(name: "Roulette de bienveillance", description: "Lancez la roulette et offrez des fleurs à la personne tirée! Pour valider la quête, vous devez...", type_of: "optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_9 = Quest.create!(name: "Photo Challenge", description: "Recréez un poster de film avec au moins 5 membres de votre équipe ! Pour valider la quête, vous devez...", type_of: "optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_10 = Quest.create!(name: "Un squelette dans le placard", description: "Jouez au jeu des 2 vérités et 1 mensonge! Pour valider la quête, vous devez...", type_of: "optional", roulette: "Non", level: level_3, criteria: criteria_json )


puts "Some quests uploaded"


puts "Creating some Team Quests Links for Team 1"

# le status "draft sera utilisé pour les cas où on a pas soumis la tql mais qu´on sauvegarde une photo ou un doc....
# "open" sera rendu par team.get_quest_status dans le cas ou pas de tql

tql_1 = TeamQuestLink.create!(team: team_1, quest: quest_1, status: "completed")
tql_2 = TeamQuestLink.create!(team: team_1, quest: quest_2, status: "completed")
tql_3 = TeamQuestLink.create!(team: team_1, quest: quest_3, status: "completed")
tql_4 = TeamQuestLink.create!(team: team_1, quest: quest_4, status: "completed")
tql_5 = TeamQuestLink.create!(team: team_1, quest: quest_5, status: "pending")
tql_6 = TeamQuestLink.create!(team: team_1, quest: quest_6, status: "rejected")
tql_7 = TeamQuestLink.create!(team: team_1, quest: quest_7, status: "completed")
tql_8 = TeamQuestLink.create!(team: team_1, quest: quest_8, status: "draft")


puts "Team Quests Links for Team 1 have been created"

puts "Creating some Team Quests Links for others teams"

tql_9 = TeamQuestLink.create!(team: team_2, quest: quest_8, status: "pending")
tql_10 = TeamQuestLink.create!(team: team_3, quest: quest_9, status: "pending")
tql_11 = TeamQuestLink.create!(team: team_4, quest: quest_10, status: "pending")

puts "Team Quests Links for others teams have been created"

puts "updating Team points accordingly"

team_1.update_points(quest_1)
team_1.update_points(quest_2)
team_1.update_points(quest_3)
team_1.update_points(quest_4)
team_1.update_points(quest_7)


puts "The new seeded DB has been created"

puts "Creating some Roles"

role_1 = Role.create!(name: 'FeelGoodFellow', description: "C'est le Coordinateur de la team")
role_2 = Role.create!(name: 'Responsable environnement', description: "C'est le responsable des actions en lien avec l'environnement de travail")
role_3 = Role.create!(name: 'Responsable sport', description: "C'est le responsable des actions en lien avec le sport")
role_4 = Role.create!(name: 'Responsable interaction externes', description: "C'est le responsable de toute la com interne à l'équipe")
role_5 = Role.create!(name: 'Responsable interactions internes', description: "C'est le responsable de toute la com externe à l'équipe")

puts "Roles have been created"


puts "Creating some user_role_links"

user_role_link_1 = UserRoleLink.create!(on_boarding: true, role: role_1, user: User.find_by(first_name: "Player1"))
user_role_link_2 = UserRoleLink.create!(on_boarding: true, role: role_2, user: User.find_by(first_name: "Player2"))
user_role_link_3 = UserRoleLink.create!(on_boarding: true, role: role_3, user: User.find_by(first_name: "Player3"))
user_role_link_4 = UserRoleLink.create!(on_boarding: true, role: role_4, user: User.find_by(first_name: "Player4"))
user_role_link_5 = UserRoleLink.create!(on_boarding: true, role: role_5, user: User.find_by(first_name: "Player5"))

puts "user_role_links have been created"

puts "Creating some Messages"

message_1 = Message.create!({
                            user: User.find(1),
                            perimeter: "public",
                            value: "Premier message public les gars!"
                          })


message_2 = Message.create!({
                            user: User.find(2),
                            perimeter: "public",
                            value: "Bravo mec!",
                            message_ref: message_1
                          })

message_3 = Message.create!({
                            user: User.find(3),
                            perimeter: "team",
                            value: "Ok team! On va les niker!",
                          })

message_4 = Message.create!({
                            user: User.find(4),
                            perimeter: "team",
                            value: "C´est clair on est des gueudins!",
                          })

message_4 = Message.create!({
                            user: User.find(1),
                            perimeter: "team",
                            value: "Parle mieux Jean-Pierre voyons...",
                            message_ref: message_3
                          })

puts "Some messages have been created"

puts "Creating some polls"
poll_message_1 = Message.create!(user: User.find(1), perimeter: "team", type_of: "poll")
poll_message_2 = Message.create!(user: User.find(2), perimeter: "team", type_of: "poll")
poll_1 = Poll.create!(name: "Qui vote pour frapper Jean Pierre?", description: "Jean-Pierre parle trop mal, il faut le punir.", message: poll_message_1, type_of: "standard")
poll_2 = Poll.create!(name: "On fait quoi des cendres de JP?", message: poll_message_2, type_of: "standard")
puts "Some polls have been created"

puts "Creating Options"
option_1 = Option.create!(poll: poll_1, description: "Oui, on le frappe")
option_2 = Option.create!(poll: poll_1, description: "On le brûle")
option_3 = Option.create!(poll: poll_1, description: "On va boire une bière plutôt?")
option_4 = Option.create!(poll: poll_2, description: "On les jette du haut d´une falaise")
option_5 = Option.create!(poll: poll_2, description: "On les sniffe!")
puts "Options ok"

puts "Creating Poll User links"
pul_1 = PollUserLink.create!(poll: poll_1, user: User.find(1), option: option_1 )
pul_2 = PollUserLink.create!(poll: poll_1, user: User.find(2), option: option_2 )
pul_3 = PollUserLink.create!(poll: poll_1, user: User.find(3), option: option_3 )
pul_4 = PollUserLink.create!(poll: poll_1, user: User.find(4), option: option_2 )
pul_5 = PollUserLink.create!(poll: poll_2, user: User.find(1), option: option_4 )
pul_6 = PollUserLink.create!(poll: poll_2, user: User.find(2), option: option_5 )
puts "Poll User links ok"





