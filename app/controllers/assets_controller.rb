require 'cloudinary'
class AssetsController < ApplicationController

    def destroy_thumbnail
        public_id = params[:public_id]
        auth ={
            cloud_name: ENV["CLOUD_NAME"],
            api_key: ENV["API_KEY"],
            api_secret: ENV["API_SECRET"]
        }
        Cloudinary::Uploader.destroy(public_id, auth)
        render json: {message: "Id destroyed"}, status: :ok
    end

    def destroy_audio
        public_id = params[:public_id]
        Cloudinary::Uploader.destroy(public_id, options = {
            cloud_name: ENV["CLOUD_NAME"],
            api_key: ENV["API_KEY"],
            api_secret: ENV["API_SECRET"],
            resource_type: 'raw'
        })
        render json: {message: "Id destroyed"}, status: :ok
    end

    def destroy_video
        public_id = params[:public_id]
        Cloudinary::Uploader.destroy(public_id, options = {
            cloud_name: ENV["CLOUD_NAME"],
            api_key: ENV["API_KEY"],
            api_secret: ENV["API_SECRET"],
            resource_type: 'video'
        })
        render json: {message: "Id destroyed"}, status: :ok
    end

end
