require "test_helper"

class GameMapControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get game_map_show_url
    assert_response :success
  end
end
