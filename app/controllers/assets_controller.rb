require 'cloudinary'
class AssetsController < ApplicationController
    def destroy_image
        public_id = params[:public_id]
        auth ={
            cloud_name: ENV["CLOUD_NAME"],
            api_key: ENV["API_KEY"],
            api_secret: ENV["API_SECRET"]
        }
        Cloudinary::Uploader.destroy(public_id, auth)
        render json: {message: "Id destroyed"}, status: :ok
    end
end
