class Comment < ActiveRecord::Base
	belongs_to :trail
	belongs_to :user

	validates :rating, presence: true
	validates :difficulty, presence: true
	validates :review, presence: true
	validates_length_of :tip, maximum: 140

	def difficulty_to_words
		convert_hash = {Easy: 0, Moderate: 1, Hard: 2}
    convert_hash.key(self.difficulty.floor).to_s.downcase
	end

	def rating_to_trees
   	'<i class="fa fa-tree"></i>' * self.rating
	end
end
