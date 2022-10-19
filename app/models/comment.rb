# == Schema Information
#
# Table name: comments
#
#  id           :bigint           not null, primary key
#  commenter_id :bigint
#  video_id     :bigint
#  timestamp    :float            not null
#  parent_id    :bigint
#  body         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Comment < ApplicationRecord

    validates :commenter_id, :video_id, :timestamp, :body, presence: true
    validates :body, length: { in: 0..255 }

    belongs_to :commenter,
        foreign_key: :commenter_id,
        class_name: :User

    belongs_to :video,
        foreign_key: :video_id,
        class_name: :Video

    belongs_to :parent,
        foreign_key: :parent_id,
        class_name: :Comment,
        optional: :true

    has_many :children,
        foreign_key: :parent_id,
        class_name: :Comment

    def score
        # someday
    end

    
end
