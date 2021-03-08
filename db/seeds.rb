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

puts "The new seeded DB has been created"
