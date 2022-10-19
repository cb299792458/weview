# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  video_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
        
    belongs_to :video,
        foreign_key: :video_id,
        class_name: :Video
end
