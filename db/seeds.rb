require 'open-uri'
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Video.destroy_all
    User.destroy_all
    Comment.destroy_all
    Like.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('videos')
    ApplicationRecord.connection.reset_pk_sequence!('comments')
    ApplicationRecord.connection.reset_pk_sequence!('likes')
  
    puts "Creating users..."
    # Create some users with an easy to remember username, email, and password:
    l = User.create!(
        username: 'lamb', 
        email: 'lamb@gmail.com', 
        password: 'wordpass'
    )
    s = User.create!(
        username: 'sheep', 
        email: 'sheep@gmail.com', 
        password: 'wordpass'
    )
    k = User.create!(
        username: 'kid', 
        email: 'kid@gmail.com', 
        password: 'wordpass'
    )
    g = User.create!(
        username: 'goat', 
        email: 'goat@gmail.com', 
        password: 'wordpass'
    )

    v = Video.create!(
        uploader_id: 1,
        title: 'cute cat',
        description: "Chi the kitten is becoming a fullstack programmer. She's learning everything from scratch in just 16 weeks. She has a really good idea for an app, and hopes to find a great job. Chi gets easily distracted, particularly attracted to small moving objects. Chi is generally sweet, but will sometimes come off as being rude. Chi is also very clumsy at times, and makes many mistakes, most of which she doesn't seem to be aware of, but she is a great programmer."
    )
    
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

    v2 = Video.create!(
        uploader_id: 2,
        title: 'How To Use WeView',
        description: "WeView is a great site. This video discussed how to signup, login, signout, search, upload videos, edit videos, delete videos, and most importantly, the comment feature."
    )
    
    weview = URI.open("https://weview-seeds.s3.amazonaws.com/weview.mp4")
    v2.upload.attach(io: weview, filename: 'weview.mp4')
  
    v3 = Video.create!(
        uploader_id: 2,
        title: 'bunny stretches to receive some kisses',
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
    )
    
    stretch = URI.open("https://weview-seeds.s3.amazonaws.com/stretch.mp4")
    v3.upload.attach(io: stretch, filename: 'stretch.mp4')
  
    v4 = Video.create!(
        uploader_id: 4,
        title: 'How to play Sneak Snack Snake',
        description: "I show you how to play Sneak Snack Snake. I got the high score on an earlier take, but I forgot to press record T_T https://cb299792458.github.io/snacke/"
    )
    
    snacke = URI.open("https://weview-seeds.s3.amazonaws.com/snacke.mp4")
    v4.upload.attach(io: snacke, filename: 'snacke')
  
    v5 = Video.create!(
        uploader_id: 4,
        title: 'otters holding hands while drifting in the water',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    )
    
    otters = URI.open("https://weview-seeds.s3.amazonaws.com/otters.mp4")
    v5.upload.attach(io: otters, filename: 'otters.mp4')
  
    v6 = Video.create!(
        uploader_id: 3,
        title: 'Little kid explains while loop',
        description: "This young child has started learning computer science at a very young age, and explains a while loop perfectly. How are we going to compete in the job market? He's sick at coding, and also seems kind of sick."
    )
    
    kid = URI.open("https://weview-seeds.s3.amazonaws.com/kid.mp4")
    v6.upload.attach(io: kid, filename: 'kid.mp4')
  
    v7 = Video.create!(
        uploader_id: 3,
        title: 'Cute Lamb Needs Cuddles',
        description: "Someone please pet this lamb."
    )
    
    lamb = URI.open("https://weview-seeds.s3.amazonaws.com/lamb.mp4")
    v7.upload.attach(io: lamb, filename: 'lamb.mp4')
  
    v8 = Video.create!(
        uploader_id: 1,
        title: 'Newton`s Second Law, Video Lesson',
        description: "Newton's Second Law is the most important equation in classical physics. It explains the relationship between net force and intertia, causing acceleration, which governs the motion of all moving objects throughout the known universe."
    )
    
    physics = URI.open("https://weview-seeds.s3.amazonaws.com/physics.mp4")
    v8.upload.attach(io: physics, filename: 'physics.mp4')
  
    puts "Done!"
  end