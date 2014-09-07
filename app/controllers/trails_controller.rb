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
    @user = current_user
    @trail = Trail.find(params[:id])
    @photo = Photo.new
    if request.xhr?
      respond_to do |format|
        format.json { render json: @trail.to_json }
      end
    end
  end

  def more_comments
    if request.xhr?
      current_comment_id = (params[:trail][:current_id]).to_i
      all_trail_comments = Comment.where(trail_id: params[:trail][:trail])
        comments = []
        all_trail_comments.order(id: :desc).each do |comment|
          if (comment.id < current_comment_id) && (comment.id > current_comment_id - 6)
            comments << comment
          elsif (comment.id < current_comment_id - 6)
            break
          end
        end
      respond_to do |format|
        format.json { render json: comments, include: [:user]  }
      end
    end
  end


end
