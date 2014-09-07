class SessionsController < ApplicationController
	respond_to :json

	def index
		if request.xhr?
      respond_to do |format|
        format.json { render json: current_user.to_json }
      end
    end
	end

	def create
		user = User.find_by_email(strong_params[:email])
		if user && user.authenticate(strong_params[:password])
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
		session.clear
		respond_to do |format|
			format.json {render json: {success: 0 }}
		end
	end

	private

	def strong_params
		params.require(:user).permit(:email, :password)
	end

end
