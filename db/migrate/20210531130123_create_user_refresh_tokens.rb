class CreateUserRefreshTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :user_refresh_tokens do |t|
      t.integer  :user_id
      t.string   :refresh_token
      t.datetime  :expires_at

      t.timestamps
    end
  end
end
