class TagsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_tag, only: [:show, :update, :destroy]
  # GET /tags
  def index
    @tags = Tag.all
    json_response(@tags)
  end

  # POST /tags
  def create
    @tag = Tag.create!(tag_params)
    ActionCable.server.broadcast "tags", {
        tag: @tag,
        added: true,
        from_stream: "tags",
    }
    json_response(@tag, :created)
  end

  # GET /tags/:id
  def show
    json_response(@tag)
  end

  # PUT /tags/:id
  def update
    @tag.update(tag_params)
    json_response(@tag)
  end

  # DELETE /tags/:id
  def destroy
    @tag.destroy
    ActionCable.server.broadcast "tags", {
        tag: @tag,
        added: false,
        from_stream: "tags"
    }
    json_response(@tag)
  end

  private

  def tag_params
    # whitelist params
    params.permit(:name)
  end

  def set_tag
    @tag = Tag.find(params[:id])
  end

end
