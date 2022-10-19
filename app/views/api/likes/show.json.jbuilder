
json.likes do 
    @video.likes.each do |like|
        json.set! like.id do
            json.extract! like, :id, :user_id, :video_id
        end
    end
end