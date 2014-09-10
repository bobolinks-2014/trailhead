class UsersController < ApplicationController

  def create
    @user = User.new(strong_params)
    if @user.save
      session[:user_id] = @user.id
      respond_to do |format|
        format.json {render json: {success: 0, message: "Thanks For Signing Up!"} }
      end
    elsif User.find_by(username: @user.username)
      respond_to do |format|
        format.json {render json: {success: 1, message: "Username Already Taken!"} }
      end
    elsif User.find_by(email: @user.email)
      respond_to do |format|
        format.json {render json: {success: 1, message: "Email Already Taken!"} }
      end
    elsif @user.password.blank? || @user.password.length < 6
      respond_to do |format|
        format.json {render json: {success: 1, message: "Password Must Be 6 or More Characters!"} }
      end
    else
      respond_to do |format|
        format.json {render json: {success: 1, message: "Password Does Not Match!"} }
      end
    end
  end

  def show

  end

  private

  def strong_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
