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


# 10.times do
#   User.create(username: Faker::Name.first_name , email: Faker::Internet.email, password: "1234567", password_confirmation: "1234567")
# end

# i = 0
# 5000.times do
#   Comment.create(user_id: rand(1..10), trail_id: rand(1..6000), review: Faker::Lorem.paragraph(6), difficulty: rand(1..3), rating: rand(1..5), tip: Faker::Lorem.sentence(1), date_hiked: Time.now.ago(45))
#   puts "Seeding #{i}th comment" if i % 1000 == 0
#   i += 1 
# end

# 30.times do
#   Comment.create(user_id: rand(1..10), trail_id: 1, review: Faker::Lorem.paragraph(6), difficulty: rand(1..3), rating: rand(1..5), tip: Faker::Lorem.sentence(1), date_hiked: Time.now.ago(45))
# end

user1 = User.create(username: "John Hiker" , email: "john@hiker.com", password: "1234567", password_confirmation: "1234567")

user2 = User.create(username: "Sally Smith" , email: "sallyhiker@email.com", password: "2234567", password_confirmation: "2234567")

user3 = User.create(username: "Sheila Darby" , email: "sdarbs@email.com", password: "3234567", password_confirmation: "3234567")

user4 = User.create(username: "Jerry Tom" , email: "icecream@email.com", password: "4234567", password_confirmation: "4234567")

user5 = User.create(username: "Tom Many" , email: "primenumbers@email.com", password: "5234567", password_confirmation: "5234567")

comment5 = Comment.create(user: user1, trail_id: 4561, review: "The trail was lively. Met lots of trail folk! Loved them!", difficulty: 1, rating: 5, tip: "Wear sunscreen, there's an open meadow I got burned in", date_hiked: Time.now.ago(45))

comment5.trail.update_rating
comment5.trail.update_difficulty

comment1 = Comment.create(user: user2, trail_id: 4561, review: "Well, that was the worst trail I've ever hiked", difficulty: rand(1..3), rating: 2, tip: "Don't go. It's a trap.", date_hiked: Time.now.ago(45))

comment1.trail.update_rating
comment1.trail.update_difficulty

comment2 = Comment.create(user: user3, trail_id: 4561, review: "Meh, I had a good time, but not a great time. The district could keep better track of it", difficulty: 1, rating: 4, tip: "Go. with friends; it's probably a lot more fun that way.", date_hiked: Time.now.ago(45))

comment2.trail.update_rating
comment2.trail.update_difficulty


comment3= Comment.create(user: user4, trail_id: 4561, review: "That was swell. Really swell. Like the most swell thing I've done.", difficulty: rand(1..3), rating: 5, tip: "I brought music, jammed, and walked. T'was great.", date_hiked: Time.now.ago(45))

comment3.trail.update_rating
comment3.trail.update_difficulty


comment4= Comment.create(user: user5, trail_id: 4561, review: "It was muddy and there were flies everywhere, maybe I'm reviewing the outdoors in general, but I appreciate this outlet that give voice to my opinion.", difficulty: 3, rating: 2, tip: "While you may have to sign in to post on this site, you don't have to hike the trail to post on this site", date_hiked: Time.now.ago(45))


comment4.trail.update_rating
comment4.trail.update_difficulty

# 1.times do
  
  # Photo.create(trail_id: 1, created_at: Time.now, updated_at: Time.now, image: uploader.retrieve_from_store!('/1a-gummy.jpg'))
  
 # Photo.create!(trail_id: 3, created_at: Time.now, updated_at: Time.now, image: File.open(File.expand_path(File.join('~/Desktop', '/1a-gummy_2.jpg'))))
# end

# uploader = ImageUploader.new
# uploader.store!(my_file)
# my_file = File.open(File.expand_path(File.join('~/Desktop', '/1a-gummy.jpg')))

# File.open('uploads/photos/1a-gummy.jpg')
# File.open(File.join('http://s3-eu-west-1.amazonaws.com/', 'dbc2014/uploads/1a-gummy.jpg'))

# File.open(File.join('http://dbc2014-assets.s3.amazonaws.com', '/uploads/photos/1a-gummy.jpg'))
