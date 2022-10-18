@videos.each do |video|
    json.set! video.id do
        json.extract! video, :id, :title, :description, :uploader_id
        json.videoUrl video.upload.url
        json.uploader video.uploader.username
    end
end