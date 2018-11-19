class UsersController < ApplicationController
  before_action :set_user, only: [:show,
                                  :update,
                                  :destroy,
                                  :create_tags,
                                  :destroy_tags,
  ]

  # GET /users
  def index
    @users = User.all
    json_response(@users, :ok, :tags)
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  # GET /users/:id
  def show
    json_response(@user, :ok, :tags)
  end

  # PUT /users/:id
  def update
    @user.update(user_params)
    json_response(@user, :ok, :tags)
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    json_response(@user, :ok, :tags)
  end

  # CREATE /users/:id/tags
  def create_tags
    @tag = Tag.find(params[:tag_id])
    @user.tags << @tag
    json_response(@user, :ok, :tags)
  end

  # DELETE /users/:id/tags/:tag_id
  def destroy_tags
    @tag = @user.tags.find(params[:tag_id])
    @user.tags.delete(@tag)
    json_response(@user, ':ok', :tags)
  end

  private

  def user_params
    # whitelist params
    params.permit(:pseudo,
                  :mail,
                  :password,
                  :password_confirmation,
                  :website)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
