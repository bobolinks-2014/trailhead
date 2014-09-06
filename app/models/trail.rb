class Trail < ActiveRecord::Base
	has_many :photos
	has_many :comments

  def self.markers
    Trail.select('id, name, latitude, longitude')
  end
end
# // var markers = [{name: "Rocky",id: 1, latitude: 37.09024, longitude: -95.712891}, {name: "Foo", id: 2, latitude: 38.09024, longitude: -96.712891}, {name: "Baz", id: 3, latitude: 36.09024, longitude: -94.712891}]
