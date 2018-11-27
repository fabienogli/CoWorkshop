class TagChannel < ApplicationCable::Channel
  def subscribed
    params[:tags].each do | tag |
      stream_from "tag_#{tag}"
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
