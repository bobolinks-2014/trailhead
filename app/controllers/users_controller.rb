class UsersController < ApplicationController

  def create
    @user = User.new(strong_params)
    if @user.save
      session[:user_id] = @user.id
      respond_to do |format|
        format.json {render json: {success: 0, message: "Thanks for signing up!"} }
      end
    else
      respond_to do |format|
        format.json {render json: {success: 1, message: "Unable to create the user. The password is in use."} }
      end
    end
  end

  private

  def strong_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
