json.extract! @video, :id, :uploader_id, :title, :description
json.videoUrl @video.upload.url
json.uploader @video.uploader.username
json.comments @video.comments, :id, :commenter_id, :timestamp, :parent_id, :body
