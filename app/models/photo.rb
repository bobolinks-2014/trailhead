require 'file_size_validator'
class Photo < ActiveRecord::Base

  mount_uploader :image, ImageUploader, :on => :image

  validates_integrity_of :image
  validates_processing_of :image
  validates :image,
    :presence => true,
    :file_size => {
      :maximum => 0.5.megabytes.to_i
    }

end
