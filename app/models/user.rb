# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :username, length: { in: 3..30 }
  validates :email, length: { in: 3..255 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :videos,
    foreign_key: :uploader_id,
    class_name: :Video

  def self.find_by_credentials(credential,password)

    if URI::MailTo::EMAIL_REGEXP.match(credential)
      user = User.find_by(email: credential) 
    else
      user = User.find_by(username: credential)
    end

    if user&.authenticate(password)
      user
    else
      nil
    end

  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    new_session_token = false

    while !new_session_token || User.exists?(session_token: new_session_token)
      new_session_token = SecureRandom.urlsafe_base64
    end

    return new_session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
