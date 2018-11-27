class NotificationsController < ApplicationController
  before_action :authenticate_user
  before_action :set_notif, only: [:show, :update, :destroy]
  # GET /notifications
  def index
    @notifs = Notification.all
    json_response(@notifs)
  end

  # POST /notifications
  def create
    @notif = Notification.create!(notification_params)
    json_response(@notif, :created)
  end

  # GET /notifications/:id
  def show
    json_response(@notif)
  end

  # PUT /notifications/:id
  def update
    @notif.update(notification_params)
    json_response(@notif)
  end

  # DELETE /notifications/:id
  def destroy
    @notif.destroy
    json_response(@notif)
  end

  private

  def notification_params
    # whitelist params
    params.permit(:title, :redirects_to, :user_id, :read)
  end

  def set_notif
    @notif = Notification.find(params[:id])
  end
end
