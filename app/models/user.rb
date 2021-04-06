class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :team
  has_one :company, through: :team


  has_many :likes, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :polls, through: :messages
  has_many :poll_user_links, dependent: :destroy
  has_many :user_role_links, dependent: :destroy
  has_many :roles, through: :user_role_links

  validates :email, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, uniqueness: {
    message: 'This email already exists in the DB.'
  }

  has_one_attached :photo


  def get_full_name
    "#{self.first_name} #{self.last_name}"
  end
end
