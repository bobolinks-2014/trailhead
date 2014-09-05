class SessionsController < ApplicationController
	def create
		user = User.find_by_email(params[:email])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			redirect_to admin_root_path, :notice => "Welcome back, #{user.email}"
		else
			flash.now.alert = "Invalid email or password"
			render "new"
		end
	end
end
