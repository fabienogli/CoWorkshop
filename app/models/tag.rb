class Tag < ApplicationRecord
  has_and_belongs_to_many :works
  has_and_belongs_to_many :users
end
