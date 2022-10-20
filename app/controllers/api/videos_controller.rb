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
        p "Here"
        p video
        if video.save
            render json: {message: "You did it!", id: video.id}
        else
            render json: {errors: video.errors.full_messages, status: 422}
        end
    end

    def index 
        @videos = Video.all
        render :index
    end

    def update
        @video = Video.find(params[:id])
        if @video.update(video_params)
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end


    end

    def destroy
        video = Video.find(params[:id])
        if video
            video.destroy
            render json: {message: "Success!"}
        else
            render json: {message: "Video not found!"}, status: 404
        end
    end


    private

    def video_params
        params.require(:video).permit(:title, :upload, :description, :uploader_id)
    end

end