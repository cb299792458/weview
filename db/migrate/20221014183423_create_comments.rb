class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :commenter, foreign_key: {to_table: :users}
      t.references :video, foreign_key: {to_table: :videos}
      t.integer :timestamp, null: false
      t.references :parent, index: true
      t.string :body, null: false

      t.timestamps
    end
  end
end
