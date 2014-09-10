class PhotosController < ApplicationController

  def create
    @photo = Photo.new(trail_id: params[:trail_id], image: strong_params[:image])
   
    if @photo.save

      redirect_to "/trails/#{@photo.trail_id}"
    else
      flash[:notice] = @photo.errors.full_messages.join("<br>")
      redirect_to "/trails/#{@photo.trail_id}"
    end
    
  end


  def strong_params
    params.require(:photo).permit(:image)
  end
end
