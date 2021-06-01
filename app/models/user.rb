class User < ApplicationRecord
  has_many :user_refresh_tokens, dependent: :destroy

  has_secure_password

  def generate_auth(uuid='')
    token = JWT.encode({
      user_id: self.id,
      expires_at: Time.now + 1.days,
      uuid: uuid
    }, 'secret')
    user_refresh_token = self.user_refresh_tokens.create
    {
      refresh_token: user_refresh_token.refresh_token,
      token: token
    }
  end
end
