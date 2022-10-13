ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('videos')
  
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
    # chi = File.open('app/chi.mp4')
    # v.upload.attach(io: chi, filename: 'chi.mp4')
  


    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end
  
    puts "Done!"
  end