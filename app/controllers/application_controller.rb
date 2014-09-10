class ApplicationController < ActionController::Base
 helper_method :current_user

  def current_user
    @user ||= User.find(session[:user_id]) if session[:user_id]
  end



  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
end
