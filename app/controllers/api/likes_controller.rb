class Api::LikesController < ApplicationController
    def create
        if like = Like.find_by(like_params)
            render json: {message: "Already liked?!", id: like.id}
        else
            like = Like.new(like_params)
            if like.save
                # render json: {message: "You did it!", id: like.id}
                render json: {message: "You did it!", like: like }
            else
                render json: {errors: like.errors.full_messages, status: 422}
            end
        end
    end

    def show
        @video = Video.find_by(id: params[:id])

        render :show
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
        render json: {message: "You did it!", id: like.id}
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :video_id)
    end
end
