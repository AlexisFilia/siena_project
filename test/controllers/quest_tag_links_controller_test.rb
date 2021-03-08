require "test_helper"

class QuestTagLinksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get quest_tag_links_index_url
    assert_response :success
  end

  test "should get new" do
    get quest_tag_links_new_url
    assert_response :success
  end

  test "should get create" do
    get quest_tag_links_create_url
    assert_response :success
  end
end
