require 'faker'
require 'csv'

CSV.foreach('db/trails.csv', headers: true) do |row|
	city = row[0]
	state = row[1]
	name = row[2]
	longitude = row[3]
	latitude = row[4]
	url = row[5]
	description = row[6]
	length = row[7]

	Trail.create(name: name, latitude: latitude, longitude: longitude, length: length, city: city, state: state, description: description, length: length, url: url)
end


10.times do
  User.create(username: Faker::Name.first_name , email: Faker::Internet.email, password: "1234", password_confirmation: "1234")
end

45.times do
  Comment.create(user_id: rand(1..10), trail_id: 1, review: Faker::Lorem.paragraph(6), difficulty: rand(1..3), rating: rand(1..5), tip: Faker::Lorem.sentence(1), date_hiked: Time.now.ago(45) )
end
