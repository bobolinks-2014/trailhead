class Comment < ActiveRecord::Base
	belongs_to :trail
	belongs_to :user

	validates :rating, presence: true
	validates :difficulty, presence: true
	validates :review, presence: true
	validates_length_of :tip, maximum: 140

end
