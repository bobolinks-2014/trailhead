require 'faker'
require 'csv'

i = 0
CSV.foreach('db/trails.csv', headers: true) do |row|
	city = row[0]
	state = row[1]
	name = row[2]
	longitude = row[3]
	latitude = row[4]
	url = row[5]
	description = row[6]
	length = row[7]

	Trail.create(name: name, latitude: latitude, longitude: longitude, length: length, city: city, state: state, description: description, length: length, url: url, under_review: false)
	puts "Seeding #{i}th trail" if i % 500 == 0
	i += 1
end


10.times do
  User.create(username: Faker::Name.first_name , email: Faker::Internet.email, password: "1234567", password_confirmation: "1234567")
end

i = 0
5000.times do
  Comment.create(user_id: rand(1..10), trail_id: rand(1..6000), review: Faker::Lorem.paragraph(6), difficulty: rand(1..3), rating: rand(1..5), tip: Faker::Lorem.sentence(1), date_hiked: Time.now.ago(45))
  puts "Seeding #{i}th comment" if i % 1000 == 0
  i += 1 
end
