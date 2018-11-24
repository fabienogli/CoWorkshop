class TagChannel < ApplicationCable::TagChannel
  def subscribed
    stream_from 'tags'
  end

  def receive(data)
    ActionCable.server.broadcast("tags", data)
  end
end
