require "test_helper"

class LevelsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get levels_show_url
    assert_response :success
  end

  test "should get index" do
    get levels_index_url
    assert_response :success
  end
end
