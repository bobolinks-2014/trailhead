require 'spec_helper'

RSpec.describe User, :type => :model do
  let(:user) {User.new(username: "Cjryan28", email: "cjryan28@gmail.com")}

  it 'should have a username' do
  	expect(user.username).to eq("Cjryan28")
  end

  it 'should have an email' do
  	expect(user.email).to eq("cjryan28@gmail.com")
  end

  it { should have_many(:comments) }
  it { should have_secure_password }

end
