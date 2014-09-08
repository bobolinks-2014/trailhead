class User < ActiveRecord::Base
	has_many :comments
	has_secure_password
	validates_presence_of :password, :on => :create
	validates_presence_of :email, :on => :create
	validates :password, length: { in: 6..20 }
	validates_format_of :email, :with => /.+@.+\..+/i, uniqueness: true	
	validates_uniqueness_of :email, :on => :create
end
