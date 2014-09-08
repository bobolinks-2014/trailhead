class CommentsController < ApplicationController

  def create
    p strong_params
    @comment = Comment.new(strong_params) 

      # trail_id: strong_params[:trail_id], rating: strong_params[:rating], difficulty: strong_params[:difficulty].to_i, tip: strong_params[:tip], review: strong_params[:review], date_hiked: strong_params[:date_hiked] )
    if @comment.save
      @comment.update(user: current_user)
      @comment.trail.update_rating
      @comment.trail.update_difficulty
      # @comment.trail.update_rating
      
      
      respond_to do |format|
        format.json {render json: {success: 0, message: "Comment was created!"} }
      end
    else
      respond_to do |format|
        format.json {render json: {success: 1, message: "Could not create comment"} }
      end
    end
  end

  private

  def strong_params
    params.require(:comments).permit(:user_id, :trail_id, :rating, :difficulty, :tip, :review, :date_hiked)
  end

end

