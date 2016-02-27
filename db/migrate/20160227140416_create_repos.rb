class CreateRepos < ActiveRecord::Migration[5.0]
  def change
    create_table :repos do |t|
      t.string :name, index: true
      t.integer :tag_count, default: 0

      t.timestamps
    end
  end
end
