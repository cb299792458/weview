json.extract! @video, :id, :uploader_id, :title, :description
json.videoUrl @video.upload.url
json.uploader @video.uploader.username
json.comments @video.comments.each do |comment|
    json.extract! comment, :id, :timestamp, :parent_id, :body
    json.commenter comment.commenter.username
end
