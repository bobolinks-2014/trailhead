require 'spec_helper'

describe Trail do
	it { should have_many(:photos) }
	it { should have_many(:comments) }
end

