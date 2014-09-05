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