class ApplicationController < ActionController::API
    include Response
    include ExceptionHandler
    include Knock::Authenticable
    include Auth

    before_action :cors_set_access_control_headers

    def cors_preflight_check
      if request.method == 'OPTIONS'
        cors_set_access_control_headers
        json_response(nil, :ok);
      end
    end

    protected

    def cors_set_access_control_headers
      response.headers['Access-Control-Allow-Origin'] = '*'
      response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
      response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, Auth-Token, Email, X-User-Token, X-User-Email'
      response.headers['Access-Control-Max-Age'] = '1728000'
    end
end
