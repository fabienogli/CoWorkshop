class User < ApplicationRecord
  has_and_belongs_to_many :works
  has_and_belongs_to_many :tags
  has_many :notifications
  has_secure_password
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: true
  validates :pseudo, uniqueness: true, presence: true
end
