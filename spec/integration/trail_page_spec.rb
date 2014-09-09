require 'spec_helper'

feature 'trail page view' do

	before do
		Trail.create(id: 1, name: "Fort Zachary Taylor Historic State Park", latitude: "24.551215", longitude: "-81.805299", length: 0, difficulty: nil, city: "Key West", state: "Florida", url: "http://www.tripleblaze.com/trail.php?c=3&i=3822", description: "There are two short trails in the park; the Sand Hog Trail, located near the beach, loops through an area of native trees and vegetation typically found along the coast in the Florida Keys. Several interpretive plaques identify various plants and provide interesting information that you may not know. The other trail, Fort View Trail, takes you through a small section of tropical hammock that overlooks the fort and moat. The native trees provide essential food and habitat needed for many of the migratory bird species that frequent this area. Fort Taylor is the last stop for many of these species that get the rest and re-nourishment needed before continuing their migratory journey. Birds that have never before been seen in the United States, have been spotted at Fort Taylor and usually along the Fort View Trail.", rating: nil, under_review: false, created_at: "2014-09-09 20:48:59", updated_at: "2014-09-09 20:48:59")
		visit 'trails/1'
	end

		it "should show the trail map" do
			expect(page).to have_css('div#trail-map-canvas')
		end


		it "should have a sign in button" do
			expect(page).to have_content('Sign In')
		end

		it "should have a sign up button" do
			expect(page).to have_content('Sign Up')
		end

		it "should show the trail name" do
			expect(page).to have_content('Fort Zachary Taylor Historic State Park')
		end

		it "should show the trail rating" do
			expect(page).to have_content('Rating')
		end

		it "should show the location name" do
			expect(page).to have_content('Key West, Florida')
		end

		it "should show the trail length" do
			expect(page).to have_content('Length: 0 miles')
		end

		it "should show the trail difficulty" do
			expect(page).to have_content('Difficulty: Not rated')
		end

		it "should show the trail description" do
			expect(page).to have_content("There are two short trails in the park; the Sand Hog Trail, located near the beach, loops through an area of native trees and vegetation typically found along the coast in the Florida Keys. Several interpretive plaques identify various plants and provide interesting information that you may not know. The other trail, Fort View Trail, takes you through a small section of tropical hammock that overlooks the fort and moat. The native trees provide essential food and habitat needed for many of the migratory bird species that frequent this area. Fort Taylor is the last stop for many of these species that get the rest and re-nourishment needed before continuing their migratory journey. Birds that have never before been seen in the United States, have been spotted at Fort Taylor and usually along the Fort View Trail.")
		end

		it "should see the trailhead icon" do
			expect(page).should have_xpath("//img[@src='/assets/icon.png']")
		end

		it "should have the functionality to post comments" do
			expect(page).should have_css('div.comment-form')
		end

		it "should have the have the button to reveal more comments" do
			expect(page).should have_css('.see-more-comments-button')
		end

		it "should dynamically reveal more comments when the 'see more comments' button is clicked" do
			find('.see-more-comments-button').click
			expect(page).should have_content("Libero illum dolores. Ea vel asperiores necessitatibus quis. Sint qui sequi sit molestiae itaque libero est. Ut vel et et. Voluptatem aliquid nobis. Quos est iste molestiae rerum non. Ullam a voluptas laboriosam similique sed.")
		end




















end
