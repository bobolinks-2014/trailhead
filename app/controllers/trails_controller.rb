class TrailsController < ApplicationController
  respond_to :json

  def index
    if request.xhr?
      respond_to do |format|
        format.json { render json: Trail.markers.to_json }
      end
    else
      redirect_to '/'
    end
  end

  def show
    if request.xhr?
      current_comment_id = (params[:trail][:current_id]).to_i
      all_trail_comments = Comment.where(trail_id: params[:id])
        comments = []
        all_trail_comments.order(id: :desc).each do |comment|
          if (comment.id < current_comment_id) && (comment.id > current_comment_id - 6)
            comments << comment
          elsif (comment.id < current_comment_id - 6)
            break
          end
        end
      respond_to do |format|
        format.json { render json: comments.to_json }
      end
    end
    @trail = Trail.find(params[:id])
    @photo = Photo.new
  end

end
