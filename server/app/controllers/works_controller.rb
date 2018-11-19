class WorksController < ApplicationController
  before_action :authenticate_user
  before_action :set_work, only: [:show, :update, :destroy, :bind_participants, :unbound_participants, :bind_tags, :unbound_tags]
  @@includes = [:users, :tags]
  # GET /works
  def index
    @works = Work.all
    json_response(@works, :ok, @@includes)
  end

  # POST /works
  def create
    @work = Work.create!(work_params)
    json_response(@work, :created)
  end

  # GET /works/:id
  def show
    json_response(@work, :ok, @@includes)
  end

  # PUT /works/:id
  def update
    @work.update(work_params)
    json_response(@work, :ok, @@includes)
  end

  # DELETE /works/:id
  def destroy
    @work.destroy
    json_response(@work)
  end


  def bind_participants
    @participant = User.find(params[:user_id])
    @work.users << @participant
    json_response(@work, :ok, @@includes)
  end

  def unbound_participants
    @user = @work.users.find(params[:user_id])
    @work.users.destroy(@user)
    json_response(@work, :ok, @@includes)
  end

  def bind_tags
    @tag = Tag.find(params[:tag_id])
    @work.tags << @tag
    json_response(@work, :ok, @@includes)
  end

  def unbound_tags
    @tag = @user.tags.find(params[:tag_id])
    @work.tags.destroy(@tag)
    json_response(@user, :ok, @@includes)
  end

  private

  def work_params
    # whitelist params
    params.permit(:name, :desc, :user_id, :users, :id, :tags)
  end

  def set_work
    @work = Work.find(params[:id])
  end
end
