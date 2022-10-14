json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at

    # @user.videos.each do |video|
    #     json.extract! video, :title
    #     json.videoId :id
    # end


end