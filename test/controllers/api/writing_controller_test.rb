require "test_helper"

class Api::WritingControllerTest < ActionDispatch::IntegrationTest
  test "should get creator:belongs_to" do
    get api_writing_creator:belongs_to_url
    assert_response :success
  end

  test "should get title:" do
    get api_writing_title:_url
    assert_response :success
  end

  test "should get thumbnail:" do
    get api_writing_thumbnail:_url
    assert_response :success
  end

  test "should get content:" do
    get api_writing_content:_url
    assert_response :success
  end

  test "should get category:" do
    get api_writing_category:_url
    assert_response :success
  end

  test "should get length:integer" do
    get api_writing_length:integer_url
    assert_response :success
  end
end
