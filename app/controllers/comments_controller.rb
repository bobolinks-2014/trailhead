class CommentsController < ApplicationController

  def create
    @comment = Comment.new(strong_params)
    if @comment.save
      respond_to do |format|
        format.json {render json: {success: 0, message: "Comment was created!"} }
      end
    else
      respond_to do |format|
        format.json {render json: {success: 1, message: "Could not create comment"} }
      end
    end
  end

  def strong_params
    params.require(:comments).permit(:user_id, :trail_id, :rating, :difficulty, :tip, :review, :date_hiked)
  end

end

