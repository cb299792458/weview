class Api::VideosController < ApplicationController

    def show
        @video = Video.find_by(id: params[:id])
        if @video
            # render "api/videos/show"
            render :show
        else
            # write this
        end

    end

    def index 
        
    end




    # def video_params
    #     params.require(:video).permit(:id)
    # end

end