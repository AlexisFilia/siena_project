require "test_helper"

class PollsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get polls_show_url
    assert_response :success
  end

  test "should get new" do
    get polls_new_url
    assert_response :success
  end

  test "should get create" do
    get polls_create_url
    assert_response :success
  end

  test "should get edit" do
    get polls_edit_url
    assert_response :success
  end

  test "should get update" do
    get polls_update_url
    assert_response :success
  end

  test "should get delete" do
    get polls_delete_url
    assert_response :success
  end
end
