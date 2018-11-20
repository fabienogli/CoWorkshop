class ApplicationController < ActionController::API
    include Response
    include ExceptionHandler
    include Knock::Authenticable
    include Auth
end
