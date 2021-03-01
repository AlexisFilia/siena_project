class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :likes, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :poll_user_links, dependent: :destroy
  has_many :user_role_links, dependent: :destroy
  has_many :roles, through: :user_role_links
end
