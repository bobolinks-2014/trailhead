class UsersController < ApplicationController

  def new
    @user = User.new(params[:user])
    if @user.save
      @message = "User Profile Created Successfully"
    else
      @message = "Not Able to Create a User Profile"  
      render '/'
    end
  end
end
