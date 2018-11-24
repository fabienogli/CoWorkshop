class WorkChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'works'
  end

  def receive(data)
    ActionCable.server.broadcast("works", data)
  end
end
