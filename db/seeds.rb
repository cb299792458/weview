ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
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