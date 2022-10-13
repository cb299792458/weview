json.extract! @video, :id, :uploader_id, :title, :description
json.videoUrl @video.upload.url
