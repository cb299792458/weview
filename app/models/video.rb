class Video < ApplicationRecord
    validates :title, :description, presence: true
    validates :title, uniqueness: {scope: :uploader, message: "title already used"}

    belongs_to :uploader,
        foreign_key: :uploader_id,
        class_name: :User

    has_one_attached :file
    
end