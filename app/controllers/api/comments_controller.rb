class Api::CommentsController < ApplicationController
    def create
        p params
        comment = Comment.new(comment_params)
        if comment.save
            render json: {message: "You did it!", id: comment.id}
        else
            render json: comment.errors.full_messages, status: 422
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :timestamp, :commenter_id, :video_id, :parent_id)
    end
end
