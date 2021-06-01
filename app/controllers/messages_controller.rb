require 'net/http'
class MessagesController < ApplicationController
  before_action :authorized

  def create
    http = Net::HTTP.new("localhost", "3333")
    # http.use_ssl = true
    request = Net::HTTP::Post.new("/push_data_from_rails", {'Content-Type' => 'application/json'})
    request.body = {msg: message_params[:msg]}.to_json
    response = http.request(request)

    render json: {
      success: true
    }
  end

  private
  def message_params
    params.permit(:msg)
  end
end
