@videos.each do |video|
    json.set! video.id do
        json.extract! video, :id, :title, :description, :uploader_id
    end
end