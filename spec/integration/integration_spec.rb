require 'spec_helper'

feature 'initial view' do

  before do 
    User.create!(username: "JohnMuir", email: "john@hike.com", password: "hiker")
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


	end
 

end



#     end

#     it "should see a text field for destination address input" do
#       expect(page).to have_css('input[type="text"][name="destination"]')
#     end

#     it "should see a drop down for make of vehicle" do
#       expect(page).to have_css('select[name="make"]')
#     end

#     it "should see a drop down for model with single default option 'Model'" do
#       expect(page).to have_select('model', options: ["Model"])
#     end

#     it "should see a drop down for year of vehicle with single default option 'Year'" do
#       expect(page).to have_select('year', options: ["Year"])
#     end

#     it "should populate 'model' dropdown with appropriate models after make is selected", :js => true do
#       select "Fisker", from: 'make'
#       expect(page).to have_select('model', options: ["Model","Karma"])
#     end

#     it "should populate 'model year' dropdown with appropriate years after model is selected", :js => true do
#       select "Ferrari", from: 'make'
#       expect(page).to have_select('model', options: ["Model","308"])
#       select "308", from: 'model'
#       expect(page).to have_select('year', options: ["Year","1985"])
#     end

#     it "can hit submit button after information has been obtained", :js => true do
#       select "Ferrari", from: 'make'
#       select "308", from: 'model'
#       select "1985", from: 'year'
#       expect(page).to have_selector("input[type=submit][value='submit']")
#       click_button("submit")
#       expect(page).to have_css('ul.pricing-table')
#     end
  
#   end

# end



# feature 'final view' do

#   before do 
#     Car.create!(make: "Acura", model: "TL", year: "2007")
#   end

#   context "after user submitted information on landing page" do
    
#     it "should see a table of information displaying cost information", :js => true do
#       visit root_path
#       fill_in("starting_point", with: "351 W. Hubbard, Chicago IL")
#       fill_in('destination', with: "633 Folsom Street, San Francisco, CA") 
#       select "Acura", from: 'make'
#       select "TL", from: 'model'
#       select "2007", from: 'year'
#       click_button("submit")
#       expect(page).to have_css("ul.pricing-table")
#       expect(page).to have_css("li.title", text:"2007 Acura TL")  
#     end

#     it "should see a table of information displaying cost information", :js => true do
#       visit root_path
#       fill_in("starting_point", with: "351 W. Hubbard, Chicago IL")
#       fill_in('destination', with: "633 Folsom Street, San Francisco, CA") 
#       select "Acura", from: 'make'
#       select "TL", from: 'model'
#       select "2007", from: 'year'
#       click_button("submit")
#       expect(page).to have_css("ul.pricing-table")
#       expect(page).to have_css("li.description")
#       expect(page).to have_css("li.bullet-item")
#       expect(page).to have_css("li.cta-button") 
#       expect(page).to have_css("a.button.round.tiny") 
#     end
#   end

# end

# end
