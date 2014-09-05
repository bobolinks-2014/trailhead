require 'spec_helper'

describe Comment do
	it { should belong_to(:trail) }
	it { should belong_to(:user) }
	it { should validate_presence_of(:rating) }
	it { should validate_presence_of(:difficulty) }
	it { should validate_presence_of(:review) }
	it { should ensure_length_of(:tip).is_at_most(140) }
end

