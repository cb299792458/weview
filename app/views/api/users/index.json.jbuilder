# json.array! @users, :id, :username, :email

@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :email
    end
end
