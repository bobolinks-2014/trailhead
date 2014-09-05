class SessionsController < ApplicationController
	respond_to :json

	def create
		user = User.find_by_email(params[:email])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			respond_to do |format|
				format.json {render json: {success: 0, message: "Welcome Back!"} }
			end
		else
			respond_to do |format|
				format.json {render json: {success: 1, message: "Incorrect email or password"} }
			end
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_path, :notice => "You have successfully logged out."
	end

end
