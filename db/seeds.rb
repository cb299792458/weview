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
    User.create!(
        username: 'lamb', 
        email: 'lamb@gmail.com', 
        password: 'password'
    )
    User.create!(
        username: 'sheep', 
        email: 'sheep@gmail.com', 
        password: 'password'
    )
    User.create!(
        username: 'kid', 
        email: 'kid@gmail.com', 
        password: 'password'
    )
    User.create!(
        username: 'goat', 
        email: 'goat@gmail.com', 
        password: 'password'
    )

    v = Video.create!(
        uploader_id: 1,
        title: 'cute cat',
        description: 'kitten programming a fullstack project'
    )
    
    chi = File.open('app/chi.mp4')
    v.upload.attach(io: chi, filename: 'chi.mp4')

    Comment.create!(
        commenter_id: 2,
        video_id: 1,
        timestamp: 2,
        parent_id: nil,
        body: "So cute! Where is this from?"
    )

    Comment.create!(
        commenter_id: 1,
        video_id: 1,
        timestamp: 3,
        parent_id: 1,
        body: "An old anime, but I forgot the name..."
    )

    Comment.create!(
        commenter_id: 3,
        video_id: 1,
        timestamp: 4,
        parent_id: 1,
        body: "It's Chi's Sweet Home!"
    )

    Comment.create!(
        commenter_id: 2,
        video_id: 1,
        timestamp: 5,
        parent_id: 3,
        body: "Thanks!"
    )

    Comment.create!(
        commenter_id: 4,
        video_id: 1,
        timestamp: 10,
        parent_id: nil,
        body: "This cat programs better than me."
    )

  
    puts "Done!"
  end