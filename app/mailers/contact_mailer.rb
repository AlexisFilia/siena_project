class ContactMailer < ApplicationMailer
  def contact_mail(contact, admin)
    @contact = contact
    mail to: admin, subject: "Siena Project - Nous contacter"
  end

  def thank_you(contact)
    @contact = contact
    mail to: "#{@contact.first_name} #{@contact.last_name} <#{@contact.email}>", subject: "FellGoodFellows - Merci pour votre message!"
  end
end
