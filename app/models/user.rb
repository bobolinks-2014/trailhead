class User < ActiveRecord::Base
	has_many :comments
	has_secure_password
	validates_presence_of :password, :on => :create
end
