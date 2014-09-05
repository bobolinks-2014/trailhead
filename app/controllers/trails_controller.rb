class TrailsController < ApplicationController
  def index

    if request.xhr?
      @markers = []
      respond_to do |format|
        format.json { render json: @markers.to_json }
      end
    else
      redirect_to '/'
    end
  end
end
