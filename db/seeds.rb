require 'csv'

CSV.foreach('db/seeds.rb') do |row|
	p row
end