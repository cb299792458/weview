json.extract! @video, :id, :uploader_id, :title, :description, :created_at, :likes
json.videoUrl @video.upload.url
json.uploader @video.uploader.username
json.timeAgo time_ago_in_words(@video.created_at)
json.comments @video.comments.each do |comment|
    json.extract! comment, :id, :timestamp, :parent_id, :body
    json.commenter comment.commenter.username
end
