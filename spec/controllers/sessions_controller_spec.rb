require 'spec_helper'


Rspec.describe SessionsController, :type => :controller do

	before(:each) do 
		@hiker = User.create!(username: "JohnMuir", email: "hiker@hike.com", password: "testing", password_confirmation: "testing")
	end

	
	describe "#create" do
		it "should create a session and login the user" do
			expect (session[:user_id]).should be_nil
			post :create, user: {username: "JohnMuir", :email => "hiker@hike.com", :password => "testing"}.to_json
			expect(session[:user_id].to eq(@hiker.id))
		end
	end


	describe "#destroy" do
		it "should terminate the session and log the user out" do
			post :create, user: {username: "JohnMuir", :email => "hiker@hike.com", :password => "testing"}.to_json
			expect(session[:user_id].to eq(@hiker.id))
			get :destroy
			expect(session[:user_id]).to be_nil
		end
	end

end



