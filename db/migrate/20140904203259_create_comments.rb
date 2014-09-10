class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
    	t.integer :user_id
    	t.integer :trail_id

    	t.text :review
    	t.integer :rating
    	t.integer :difficulty
    	t.string :tip
    	
    	t.date :date_hiked

      t.timestamps
    end
  end
end
