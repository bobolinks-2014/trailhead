require 'spec_helper'

RSpec.describe User, :type => :model do
  let(:user) {User.new(username: "Cjryan28", email: "cjryan28@gmail.com")}

  it 'should have a username' do
  	expect(user.username).to eq("Cjryan28")
  end

  it 'should have an email' do
  	expect(user.email).to eq("cjryan28@gmail.com")
  end

  it 'should allow only valid email addresses' do
  	should allow_value('something@thing.com', 'valid_email@totallyvalid.com').for(:email)
  end
  

  it { should have_many(:comments) }
  it { should have_secure_password }
  it { should validate_presence_of(:email)}
  it { should validate_presence_of(:password)}
  it { should ensure_length_of(:password).is_at_least(6)}
  it { should validate_uniqueness_of(:email)}



end
