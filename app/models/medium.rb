class Medium < ApplicationRecord
  belongs_to :message, optional: true
  belongs_to :team_quest_link, optional: true

  # validates :url, presence: true
  # validates :url, uniqueness: {
  #   message: 'This url already exists in the DB.'
  # }

  has_one_attached :attached_file

  # def self.define_media(url, type_of, entity)
  #   media = if Media.exists?(url: url, type_of: type_of)
  #             Media.find_by(url: url, type_of: type_of)
  #           else
  #             Media.new(url: url, type_of: type_of)
  #           end
  #   media.send("#{entity.class.to_s.downcase}_id=", entity.id)
  #   media.save!
  # end


  def is_image?

    image_types = ["image/png"]

    image_types.include?(self.type_of)
  end
end
