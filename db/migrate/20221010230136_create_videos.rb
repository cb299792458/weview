class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.references :uploader, foreign_key: {to_table: :users}
      t.string :title, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
