class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :user, foreign_key: {to_table: :users}
      t.references :video, foreign_key: {to_table: :videos}
      t.timestamps
    end
  end
end