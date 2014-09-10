class CommentsController < ApplicationController

  def create
    @comment = Comment.new(strong_params) 

    if @comment.save
      @comment.update(user: current_user)
      @comment.trail.update_rating
      @comment.trail.update_difficulty
      respond_to do |format|
        format.json {render json: @comment, include: [:user] }
      end
    else
      respond_to do |format|
        format.json {render json: {success: 1} }
      end
    end
  end

  private

  def strong_params
    params.require(:comments).permit(:user_id, :trail_id, :rating, :difficulty, :tip, :review, :date_hiked)
  end

end

