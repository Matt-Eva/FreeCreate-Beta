# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_12_001609) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "art_comments", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "user_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["art_id"], name: "index_art_comments_on_art_id"
    t.index ["user_id"], name: "index_art_comments_on_user_id"
  end

  create_table "art_donations", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["art_id"], name: "index_art_donations_on_art_id"
    t.index ["creator_id"], name: "index_art_donations_on_creator_id"
    t.index ["user_id"], name: "index_art_donations_on_user_id"
  end

  create_table "art_lib_items", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["art_id"], name: "index_art_lib_items_on_art_id"
    t.index ["user_id"], name: "index_art_lib_items_on_user_id"
  end

  create_table "art_likes", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["art_id"], name: "index_art_likes_on_art_id"
    t.index ["user_id"], name: "index_art_likes_on_user_id"
  end

  create_table "art_list_items", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["art_id"], name: "index_art_list_items_on_art_id"
    t.index ["user_id"], name: "index_art_list_items_on_user_id"
  end

  create_table "art_taglinks", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["art_id"], name: "index_art_taglinks_on_art_id"
    t.index ["tag_id"], name: "index_art_taglinks_on_tag_id"
  end

  create_table "arts", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "title"
    t.string "thumbnail"
    t.string "content"
    t.string "category"
    t.integer "length"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_arts_on_creator_id"
  end

  create_table "aud_comments", force: :cascade do |t|
    t.bigint "audio_id", null: false
    t.bigint "user_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audio_id"], name: "index_aud_comments_on_audio_id"
    t.index ["user_id"], name: "index_aud_comments_on_user_id"
  end

  create_table "aud_donations", force: :cascade do |t|
    t.bigint "audio_id", null: false
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audio_id"], name: "index_aud_donations_on_audio_id"
    t.index ["creator_id"], name: "index_aud_donations_on_creator_id"
    t.index ["user_id"], name: "index_aud_donations_on_user_id"
  end

  create_table "aud_lib_items", force: :cascade do |t|
    t.bigint "audio_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audio_id"], name: "index_aud_lib_items_on_audio_id"
    t.index ["user_id"], name: "index_aud_lib_items_on_user_id"
  end

  create_table "aud_likes", force: :cascade do |t|
    t.bigint "audio_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audio_id"], name: "index_aud_likes_on_audio_id"
    t.index ["user_id"], name: "index_aud_likes_on_user_id"
  end

  create_table "aud_list_items", force: :cascade do |t|
    t.bigint "audio_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audio_id"], name: "index_aud_list_items_on_audio_id"
    t.index ["user_id"], name: "index_aud_list_items_on_user_id"
  end

  create_table "aud_taglinks", force: :cascade do |t|
    t.bigint "audio_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audio_id"], name: "index_aud_taglinks_on_audio_id"
    t.index ["tag_id"], name: "index_aud_taglinks_on_tag_id"
  end

  create_table "audios", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "title"
    t.string "thumbnail"
    t.string "content"
    t.string "category"
    t.integer "length"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_audios_on_creator_id"
  end

  create_table "creator_taglinks", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_creator_taglinks_on_creator_id"
    t.index ["tag_id"], name: "index_creator_taglinks_on_tag_id"
  end

  create_table "creators", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "payment_info"
    t.string "prof_pic"
    t.string "name"
    t.boolean "is_writer"
    t.boolean "is_audio"
    t.boolean "is_artist"
    t.boolean "is_video"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_creators_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_follows_on_creator_id"
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "recurring_donations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_recurring_donations_on_creator_id"
    t.index ["user_id"], name: "index_recurring_donations_on_user_id"
  end

  create_table "single_donations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_single_donations_on_creator_id"
    t.index ["user_id"], name: "index_single_donations_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_subscriptions_on_creator_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "tag"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "nickname"
    t.string "prof_pic"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "vid_comments", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "user_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_vid_comments_on_user_id"
    t.index ["video_id"], name: "index_vid_comments_on_video_id"
  end

  create_table "vid_donations", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_vid_donations_on_creator_id"
    t.index ["user_id"], name: "index_vid_donations_on_user_id"
    t.index ["video_id"], name: "index_vid_donations_on_video_id"
  end

  create_table "vid_lib_items", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_vid_lib_items_on_user_id"
    t.index ["video_id"], name: "index_vid_lib_items_on_video_id"
  end

  create_table "vid_likes", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_vid_likes_on_user_id"
    t.index ["video_id"], name: "index_vid_likes_on_video_id"
  end

  create_table "vid_list_items", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_vid_list_items_on_user_id"
    t.index ["video_id"], name: "index_vid_list_items_on_video_id"
  end

  create_table "vid_taglinks", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_vid_taglinks_on_tag_id"
    t.index ["video_id"], name: "index_vid_taglinks_on_video_id"
  end

  create_table "videos", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "title"
    t.string "thumbnail"
    t.string "content"
    t.string "category"
    t.integer "length"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_videos_on_creator_id"
  end

  create_table "writ_comments", force: :cascade do |t|
    t.bigint "writing_id", null: false
    t.bigint "user_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_writ_comments_on_user_id"
    t.index ["writing_id"], name: "index_writ_comments_on_writing_id"
  end

  create_table "writ_donations", force: :cascade do |t|
    t.bigint "writing_id", null: false
    t.bigint "user_id", null: false
    t.bigint "creator_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_writ_donations_on_creator_id"
    t.index ["user_id"], name: "index_writ_donations_on_user_id"
    t.index ["writing_id"], name: "index_writ_donations_on_writing_id"
  end

  create_table "writ_lib_items", force: :cascade do |t|
    t.bigint "writing_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_writ_lib_items_on_user_id"
    t.index ["writing_id"], name: "index_writ_lib_items_on_writing_id"
  end

  create_table "writ_likes", force: :cascade do |t|
    t.bigint "writing_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_writ_likes_on_user_id"
    t.index ["writing_id"], name: "index_writ_likes_on_writing_id"
  end

  create_table "writ_list_items", force: :cascade do |t|
    t.bigint "writing_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_writ_list_items_on_user_id"
    t.index ["writing_id"], name: "index_writ_list_items_on_writing_id"
  end

  create_table "writ_taglinks", force: :cascade do |t|
    t.bigint "writing_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_writ_taglinks_on_tag_id"
    t.index ["writing_id"], name: "index_writ_taglinks_on_writing_id"
  end

  create_table "writings", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "title"
    t.string "thumbnail"
    t.text "content"
    t.string "category"
    t.integer "length"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_writings_on_creator_id"
  end

  add_foreign_key "art_comments", "arts"
  add_foreign_key "art_comments", "users"
  add_foreign_key "art_donations", "arts"
  add_foreign_key "art_donations", "creators"
  add_foreign_key "art_donations", "users"
  add_foreign_key "art_lib_items", "arts"
  add_foreign_key "art_lib_items", "users"
  add_foreign_key "art_likes", "arts"
  add_foreign_key "art_likes", "users"
  add_foreign_key "art_list_items", "arts"
  add_foreign_key "art_list_items", "users"
  add_foreign_key "art_taglinks", "arts"
  add_foreign_key "art_taglinks", "tags"
  add_foreign_key "arts", "creators"
  add_foreign_key "aud_comments", "audios"
  add_foreign_key "aud_comments", "users"
  add_foreign_key "aud_donations", "audios"
  add_foreign_key "aud_donations", "creators"
  add_foreign_key "aud_donations", "users"
  add_foreign_key "aud_lib_items", "audios"
  add_foreign_key "aud_lib_items", "users"
  add_foreign_key "aud_likes", "audios"
  add_foreign_key "aud_likes", "users"
  add_foreign_key "aud_list_items", "audios"
  add_foreign_key "aud_list_items", "users"
  add_foreign_key "aud_taglinks", "audios"
  add_foreign_key "aud_taglinks", "tags"
  add_foreign_key "audios", "creators"
  add_foreign_key "creator_taglinks", "creators"
  add_foreign_key "creator_taglinks", "tags"
  add_foreign_key "creators", "users"
  add_foreign_key "follows", "creators"
  add_foreign_key "follows", "users"
  add_foreign_key "recurring_donations", "creators"
  add_foreign_key "recurring_donations", "users"
  add_foreign_key "single_donations", "creators"
  add_foreign_key "single_donations", "users"
  add_foreign_key "subscriptions", "creators"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "vid_comments", "users"
  add_foreign_key "vid_comments", "videos"
  add_foreign_key "vid_donations", "creators"
  add_foreign_key "vid_donations", "users"
  add_foreign_key "vid_donations", "videos"
  add_foreign_key "vid_lib_items", "users"
  add_foreign_key "vid_lib_items", "videos"
  add_foreign_key "vid_likes", "users"
  add_foreign_key "vid_likes", "videos"
  add_foreign_key "vid_list_items", "users"
  add_foreign_key "vid_list_items", "videos"
  add_foreign_key "vid_taglinks", "tags"
  add_foreign_key "vid_taglinks", "videos"
  add_foreign_key "videos", "creators"
  add_foreign_key "writ_comments", "users"
  add_foreign_key "writ_comments", "writings"
  add_foreign_key "writ_donations", "creators"
  add_foreign_key "writ_donations", "users"
  add_foreign_key "writ_donations", "writings"
  add_foreign_key "writ_lib_items", "users"
  add_foreign_key "writ_lib_items", "writings"
  add_foreign_key "writ_likes", "users"
  add_foreign_key "writ_likes", "writings"
  add_foreign_key "writ_list_items", "users"
  add_foreign_key "writ_list_items", "writings"
  add_foreign_key "writ_taglinks", "tags"
  add_foreign_key "writ_taglinks", "writings"
  add_foreign_key "writings", "creators"
end
