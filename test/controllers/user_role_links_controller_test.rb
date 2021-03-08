require "test_helper"

class UserRoleLinksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_role_links_index_url
    assert_response :success
  end

  test "should get show" do
    get user_role_links_show_url
    assert_response :success
  end
end
