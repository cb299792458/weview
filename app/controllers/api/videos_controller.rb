class Api::VideosController < ApplicationController

    def show
        @video = Video.find_by(id: params[:id])
        if @video
            # render "api/videos/show"
            render :show
        else
            render json: {message: "Video not found!"}, status: 404
        end

    end

    def create
        video = Video.new(video_params)
        if video.save
            render json: {message: "You did it!", id: video.id}
        else
            render json: video.errors.full_messages, status: 422
        end
    end

    def index 
        
    end


    private

    def video_params
        params.require(:video).permit(:title, :upload, :description, :uploader_id)
    end

end