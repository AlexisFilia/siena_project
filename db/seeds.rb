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
  end
end
puts "Some users have been created"

puts "Creating levels"

level_1 = Level.create!(name: "The Harbor")
level_2 = Level.create!(name: "The High Seas")
level_3 = Level.create!(name: "The Reefs")
level_4 = Level.create!(name: "The Hallucinogenic Forest")
level_5 = Level.create!(name: "The Desert")
level_6 = Level.create!(name: "The Oasis")
level_7 = Level.create!(name: "The Flying Rocks")
level_8 = Level.create!(name: "Moonlike Peak")
level_9 = Level.create!(name: "The Verdant Valley")
level_10 = Level.create!(name: "The Black Forest")
level_11 = Level.create!(name: "The Maze Canyon")
level_12 = Level.create!(name: "The Frozen Lands")
level_13 = Level.create!(name: "The Blizzard")
level_14 = Level.create!(name: "The Golden Pinguin")

puts "Levels have been created"

puts "Uploading some quests"

criteria_array = ["Validation criteria 1", "Validation criteria 2", "Validation criteria 3"]
criteria_json = criteria_array.to_json

quest_1 = Quest.create!(name: "Allumer la flamme", description: "5 membres de votre équipe doivent clicker sur le bateau!", type_of: "Mandatory", roulette: "Non", level: level_1, criteria: criteria_json )
quest_2 = Quest.create!(name: "Élire votre FeelGoodFellow", description: "Vous devez voter pour votre Capitaine d´équipe! Pour valider la quete...", type_of: "Speciale", roulette: "Non", level: level_2, criteria: criteria_json)
quest_3 = Quest.create!(name: "Votre nom de tribu", description: "Vous devez voter pour votre nom de tribu! Pour valider la quete....", type_of: "Mandatory", roulette: "Non", level: level_2, criteria: criteria_json )
quest_4 = Quest.create!(name: "Votre territoire", description: "Vous devez définir votre territoire! Pour valider la quete....", type_of: "Mandatory", roulette: "Non", level: level_3, criteria: criteria_json )
quest_5 = Quest.create!(name: "Une petite collation", description: "Un membre de votre équipe doit amener le petit déjeuner pour les autres. Pour valider la quête, vous devez...", type_of: "Mandatory", roulette: "Non", level: level_3, criteria: criteria_json )
quest_6 = Quest.create!(name: "FeelGoodPhoto", description: "Poster une photo de votre FeelGoodFellow! Pour valider la quête, vous devez...", type_of: "Optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_6 = Quest.create!(name: "Qui es-tu", description: "Remplir votre profil en binome! Pour valider la quête, vous devez...", type_of: "Optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_6 = Quest.create!(name: "Roulette de bienveillance", description: "Lancez la roulette et offrez des fleurs à la personne tirée! Pour valider la quête, vous devez...", type_of: "Optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_6 = Quest.create!(name: "Photo Challenge", description: "Recréez un poster de film avec au moins 5 membres de votre équipe ! Pour valider la quête, vous devez...", type_of: "Optional", roulette: "Non", level: level_3, criteria: criteria_json )
quest_6 = Quest.create!(name: "Un squelette dans le placard", description: "Jouez au jeu des 2 vérités et 1 mensonge! Pour valider la quête, vous devez...", type_of: "Optional", roulette: "Non", level: level_3, criteria: criteria_json )


puts "Some quests uploaded"

puts "The new seeded DB has been created"
