class WorksController < ApplicationController
  before_action :set_work, only: [:show, :update, :destroy]
  # GET /works
  def index
    @works = Work.all
    json_response(@works)
  end

  # POST /works
  def create
    @work = Work.create!(work_params)
    json_response(@work, :created)
  end

  # GET /works/:id
  def show
    json_response(@work)
  end

  # PUT /works/:id
  def update
    @work.update(work_params)
    json_response(@work)
  end

  # DELETE /works/:id
  def destroy
    @work.destroy
    json_response(@work)
  end

  private

  def work_params
    # whitelist params
    params.permit(:name, :desc, :user_id, :users, :id)
  end

  def set_work
    @work = Work.find(params[:id])
  end

  # def set_work_creator
  #   @user = User.find_by!(id: params[:user_id]) if @work
  # end
end
