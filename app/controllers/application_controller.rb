class ApplicationController < ActionController::Base
  before_action :authenticate_user!, :load_team_main_variables
  before_action :set_locale

  def load_team_main_variables

    if current_user
      @team = current_user.team
      @team_current_level = @team.get_level
      @team_current_level_completion = @team.get_percentage_of_level_completion(@team_current_level)
      @team_rank = @team.get_rank
      @team_points = @team.get_total_points
    end
  end

  private

  def set_locale
    I18n.locale = extract_locale || I18n.default_locale
  end

  def extract_locale
    parsed_locale = params[:locale]
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end

  def default_url_options
    { locale: I18n.locale }
  end
end
