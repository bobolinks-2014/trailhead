class Trail < ActiveRecord::Base
	has_many :photos
	has_many :comments

  def self.markers
    markers = []
    Trail.select('id, name, latitude, longitude, rating, difficulty, length').each do |trail| 
      markers << Marker.new(trail)
    end
    return markers
  end

  def difficulty_in_words
    convert_hash = {Easy: 0, Moderate: 1, Hard: 2}
    if self.difficulty == nil || self.difficulty == 0 
      "Not rated"
    else
      convert_hash.key(difficulty.floor).to_s
    end
  end

  def update_rating
    self.update(rating: Comment.where(trail_id: self.id).pluck(:rating).reduce(:+)/Comment.where(trail_id: self.id).size)
  end

  def update_difficulty
    self.update(difficulty: (Comment.where(trail_id: self.id).pluck(:difficulty).reduce(:+)/Comment.where(trail_id: self.id).size))

  end

end
# // var markers = [{name: "Rocky",id: 1, latitude: 37.09024, longitude: -95.712891}, {name: "Foo", id: 2, latitude: 38.09024, longitude: -96.712891}, {name: "Baz", id: 3, latitude: 36.09024, longitude: -94.712891}]
