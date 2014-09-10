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

  def create
    if request.xhr?
      @trail = Trail.new(name: params[:name], city: params[:city], state: params[:state], length: params[:length], description: params[:description], latitude: params[:latitude], longitude: params[:longitude], under_review: true)

      respond_to do |format|
        if @trail.save
          format.json {render json: { trail: @trail } }
        else
          format.json {render json: {success: 1, messages: @trail.errors.full_messages.join("<br>")} }
        end
      end
      
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
