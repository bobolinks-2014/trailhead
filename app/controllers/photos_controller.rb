class PhotosController < ApplicationController

  def create
    @photo = Photo.new(trail_id: strong_params[:trail_id], image: strong_params[:image])

    if @photo.save
      redirect_to trail_path(@photo.trail_id)
    else
      render '/'
    end

  end


  def strong_params
    params.require(:photo).permit(:trail_id, :image)
  end
end
