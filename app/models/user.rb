class User < ApplicationRecord
    has_and_belongs_to_many :works
    has_and_belongs_to_many :tags
end
