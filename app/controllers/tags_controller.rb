class TagsController < ApplicationController

  before_action :set_tag, only: [:show, :update, :destroy]
  # GET /tags
  def index
    @tags = Tag.all
    json_response(@tags)
  end

  # POST /tags
  def create
    p tag_params
    @tag = Tag.create!(tag_params)
    
    json_response(@tag, :created)
  end

  # GET /tags/:id
  def show
    json_response(@tag)
  end

  # PUT /tags/:id
  def update
    @tag.update(tag_params)
    head :no_content
  end

  # DELETE /tags/:id
  def destroy
    @tag.destroy
    head :no_content
  end

  private

  def tag_params
    # whitelist params
    params.permit(:name, :created_by)
  end

  def set_tag
    @tag = Tag.find(params[:id])
  end

end
