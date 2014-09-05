class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])
    if @user.save

      @message = "User Profile Created Successfully"
    else
      @message = "Not Able to Create a User Profile"
      render '/'
    end
  end

  private

  def strong_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
