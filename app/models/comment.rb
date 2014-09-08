class Comment < ActiveRecord::Base
	belongs_to :trail
	belongs_to :user
  after_create :update_trail_rating

	validates :rating, presence: true
	validates :difficulty, presence: true
	validates :review, presence: true
	validates_length_of :tip, maximum: 140

  def update_trail_rating
    current_trail_rating = self.trail.rating
    current_trail_comments_count = self.trail.comments.count
    if current_trail_rating == 0 || current_trail_rating == nil
      self.trail.update(rating: self.rating)
    else
      if current_trail_comments_count == 0 || current_trail_comments_count == nil
        self.trail.update(rating: (self.trail.rating + self.rating))
      else
        total_rating = current_trail_rating * current_trail_comments_count
        new_total = total_rating + self.rating
        new_rating = new_total/(current_trail_comments_count + 1)
        self.trail.update(rating: new_rating)
      end
    end
  end

end
