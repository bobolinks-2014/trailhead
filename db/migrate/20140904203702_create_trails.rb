class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
    	t.string :name
    	t.string :latitude
    	t.string :longitude
    	t.integer :length
    	t.integer :difficulty
    	t.string :city
    	t.string :state
      t.string :url
    	t.text :description
    	t.integer :rating
      t.boolean :under_review

      t.timestamps
    end
  end
end
