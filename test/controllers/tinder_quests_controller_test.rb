require "test_helper"

class TinderQuestsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tinder_quests_index_url
    assert_response :success
  end
end
