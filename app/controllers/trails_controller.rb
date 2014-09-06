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
    @trail = Trail.find(params[:id])
  end


end
