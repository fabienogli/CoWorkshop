class TagChannel < ApplicationCable::Channel
  def subscribed
    params[:tags].each do | tag |
      stream_from "tags_#{tag[:name]}"
    end
  end
end
