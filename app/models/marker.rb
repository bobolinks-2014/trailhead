class Marker
	
	def initialize(trail)
		@id = trail.id
		@name = trail.name
		@latitude = trail.latitude
		@longitude = trail.longitude
		@rating = convert_to_trees(trail.rating)
		@difficulty = convert_to_words(trail.difficulty)
		@length = trail.length
	end 

	def convert_to_trees(rating)
		if rating == nil || rating.to_i == 0 
       @rating = "Not rated"
    else
    	p rating
    	p "<i class='fa fa-tree'></i>" *rating
       @rating = "<i class='fa fa-tree'></i>" * rating
    end
	end

	def convert_to_words(difficulty)
		convert_hash = {Easy: 0, Moderate: 1, Hard: 2}
    if difficulty == nil || difficulty.to_i == 0 
      @difficulty = "Not rated"
     else
      @difficulty = convert_hash.key(difficulty.to_i.floor).to_s
     end
	end

end