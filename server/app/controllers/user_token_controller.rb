class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.where("email = ?", params[:auth][:email]).first
    @auth = {
        token: auth_token.token,
        user: @user,
    }
    render json: @auth, status: :ok
  end

end
