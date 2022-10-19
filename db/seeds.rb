require 'open-uri'
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Video.destroy_all
    User.destroy_all
    Comment.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('videos')
    ApplicationRecord.connection.reset_pk_sequence!('comments')
  
    puts "Creating users..."
    # Create some users with an easy to remember username, email, and password:
    l = User.create!(
        username: 'lamb', 
        email: 'lamb@gmail.com', 
        password: 'password'
    )
    s = User.create!(
        username: 'sheep', 
        email: 'sheep@gmail.com', 
        password: 'password'
    )
    k = User.create!(
        username: 'kid', 
        email: 'kid@gmail.com', 
        password: 'password'
    )
    g = User.create!(
        username: 'goat', 
        email: 'goat@gmail.com', 
        password: 'password'
    )

    v = Video.create!(
        uploader_id: 1,
        title: 'cute cat',
        description: "
            Chi the kitten is becoming a fullstack programmer.
            She's learning everything from scratch in just 16 weeks.
            She's having tons of fun seeing her ideas come to life and squashing lots of bugs.
            She has a really good idea for an app, and hopes to find a great job.
            Chi gets easily distracted, particularly attracted to small moving objects. 
            Chi is generally sweet, but will sometimes come off as being rude. 
            Chi is also very clumsy at times, and makes many mistakes, most of which 
            she doesn't seem to be aware of, but she is a great programmer.
        "
    )
    
    # chi = File.open('app/chi.mp4')
    chi = URI.open("https://weview-seeds.s3.amazonaws.com/chi.mp4")
    v.upload.attach(io: chi, filename: 'chi.mp4')

    c1 = Comment.create!(
        commenter_id: s.id,
        video_id: v.id,
        timestamp: 2.1,
        parent_id: nil,
        body: "So cute! Where is this from?"
    )

    c2 = Comment.create!(
        commenter_id: l.id,
        video_id: v.id,
        timestamp: 3.1,
        parent_id: c1.id,
        body: "An old anime, but I forgot the name..."
    )

    c3 = Comment.create!(
        commenter_id: g.id,
        video_id: v.id,
        timestamp: 4.1,
        parent_id: c1.id,
        body: "It's Chi's Sweet Home!"
    )

    c4 = Comment.create!(
        commenter_id: s.id,
        video_id: v.id,
        timestamp: 5.1,
        parent_id: c3.id,
        body: "Thanks!"
    )

    c5 = Comment.create!(
        commenter_id: k.id,
        video_id: v.id,
        timestamp: 9.9,
        parent_id: nil,
        body: "This cat programs better than me."
    )

    Like.create!(
        user_id: s.id,
        video_id: v.id
    )
    Like.create!(
        user_id: k.id,
        video_id: v.id
    )
    Like.create!(
        user_id: g.id,
        video_id: v.id
    )
  
    puts "Done!"
  end