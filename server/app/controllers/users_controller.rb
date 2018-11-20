class UsersController < ApplicationController
  before_action :authenticate_user, except: [:create]
  before_action :set_user, only: [:show,
                                  :update,
                                  :destroy,
                                  :create_tags,
                                  :destroy_tags,
  ]

  @@includes = [:tags, :works]

  # GET /users
  def index
    @users = User.all
    json_response(@users, :ok)
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  # GET /users/:id
  def show
    json_response(@user, :ok, @@includes)
  end

  # PUT /users/:id
  def update
    if is_current_user(@user.id)
      @user.update(user_params)
      json_response(@user, :ok, @@includes)
    else
      head :forbidden
    end
  end

  # DELETE /users/:id
  def destroy
    if is_current_user(@user.id)
      @user.destroy
      json_response(@user, :ok, @@includes)
    else
      head :forbidden
    end
  end

  # POST /users/:id/tags
  def create_tags
    if is_current_user(@user.id)
      @tag = Tag.find(params[:tag_id])
      @user.tags << @tag
      json_response(@user, :ok, @@includes)
    else
      head :forbidden
    end
  end

  # DELETE /users/:id/tags/:tag_id
  def destroy_tags
    if is_current_user(@user.id)
      @tag = @user.tags.find(params[:tag_id])
      @user.tags.delete(@tag)
      json_response(@user, :ok, @@includes)
    else
      head :forbidden
    end
  end

  private

  def user_params
    # whitelist params
    params.permit(:pseudo,
                  :email,
                  :password,
                  :password_confirmation,
                  :website)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
