require "test_helper"

class PollUserLinksControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get poll_user_links_show_url
    assert_response :success
  end

  test "should get index" do
    get poll_user_links_index_url
    assert_response :success
  end

  test "should get new" do
    get poll_user_links_new_url
    assert_response :success
  end

  test "should get create" do
    get poll_user_links_create_url
    assert_response :success
  end
end
