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


end
