# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  uploader_id :bigint
#  title       :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
    validates :title, :description, presence: true
    validates :title, uniqueness: {scope: :uploader, message: "title already used"}

    belongs_to :uploader,
        foreign_key: :uploader_id,
        class_name: :User

    has_one_attached :upload

    has_many :comments,
        foreign_key: :video_id,
        class_name: :Comment, 
        dependent: :destroy
        
    has_many :likes,
        foreign_key: :video_id,
        class_name: :Like, 
        dependent: :destroy
end
