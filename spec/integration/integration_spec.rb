require 'spec_helper'

feature 'initial view' do

  before do 
    visit root_path
  end

  context "on landing page" do
    
    it "should see a sign in button" do
      expect(page).to have_content('Sign In')
    end

	  it "should see a sign up button" do
	    expect(page).to have_content('Sign Up')
	  end

	  it "should see a 'use current location' button" do
  		expect(page).to have_selector(:link_or_button, 'Use current location')
  	end

  	it "can click the sign in button to bring up the sign in form", :js => true do
  		find(".signin-button").click
  		expect(page.driver.browser.window_handles.length.should == 1)
  	end

  	it "the popup has the correct sign in form", :js => true do
  		find(".signin-button").click
  		within_window(page.driver.browser.window_handles.last) do 
  			page.should have_content('Sign In')
  			page.should have_css('input[type="text"][name="email"]')
  			page.should have_selector(:link_or_button, "Sign In")
  		end
  	end

  	it "can click the sign up button to bring up the sign up form", :js => true do
  		find(".signup-button").click
  		expect(page.driver.browser.window_handles.length.should == 1)
  	end

  	it "the popup has the correct sign up form", :js => true do
  		find(".signup-button").click
  		within_window(page.driver.browser.window_handles.last) do
  			page.should have_content('Sign Up')
  			page.should have_css('input[type="text"][name="username"]')
  			page.should have_css('input[type="text"][name="email"]')
  			page.should have_css('input[type="password"][name="password"]')
  			page.should have_css('input[type="password"][name="password_confirmation"]')
  			page.should have_selector(:link_or_button, "Sign Up")
  		end
  	end

  end

  feature 'signin and signup' do

  	before do
  		visit root_path
  	end

  	it "should create a new user upon sign up", :js => true do
  		find(".signup-button").click
  		within_window(page.driver.browser.window_handles.last) do
  			fill_in("username", with: "testhiker")
  			fill_in("email", with: "testemail")
  			fill_in("password", with: "password")
  			fill_in("password_confirmation", with: "password")
				click_button("Sign Up")
  		end
  	end

  	it "should log in an authenticated user", :js => true do
  		find(".signin-button").click
  		within_window(page.driver.browser.window_handles.last) do
  			fill_in("email", with: "thing@thing.com")
  			fill_in("password", with: "thing")
  			click_button("Sign In")
  			page.should have_content("Sign In")
  		end
  	end


	end
 

end

