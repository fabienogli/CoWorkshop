class TagChannel < ApplicationCable::Channel
  def subscribed

  end

  def subscribe_all(data)
    data["tags"].each do |tag|
      stream_from "tags_#{tag["name"]}"
    end
  end

  def another_sub(data)
    stream_from "tags_#{data["tag"]}"
  end

end
