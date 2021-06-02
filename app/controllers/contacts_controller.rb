class ContactsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :new, :create ]

  def new
    @contact = Contact.new
    @primary = 2
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      ContactMailer.contact_mail(@contact).deliver
      ContactMailer.thank_you(@contact).deliver
      redirect_to root_path, :alert => 'Thank you for your message !'
    else
      render :new
    end
  end

  def thanks
  end

  private
  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email, :message, :company)
  end
end
