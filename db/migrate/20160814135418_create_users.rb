class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :auth_token

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :auth_token, unique: true
  end
end
