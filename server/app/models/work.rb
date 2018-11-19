class Work < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :users
  has_and_belongs_to_many :tags

  validates :name, presence: true
  validates :desc, presence: true
end
