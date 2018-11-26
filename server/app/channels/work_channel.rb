class WorkChannel < ApplicationCable::Channel
  def subscribed
    stream_from "works_#{params[:user_id]}"
  end
end
