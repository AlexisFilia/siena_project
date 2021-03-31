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

ActiveRecord::Schema.define(version: 2021_03_08_191543) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "logo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "levels", force: :cascade do |t|
    t.string "name"
    t.integer "next_level_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "likes", force: :cascade do |t|
    t.string "type_of"
    t.bigint "team_quest_link_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_quest_link_id"], name: "index_likes_on_team_quest_link_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "media", force: :cascade do |t|
    t.string "url"
    t.string "type_of"
    t.bigint "team_quest_link_id"
    t.bigint "message_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id"], name: "index_media_on_message_id"
    t.index ["team_quest_link_id"], name: "index_media_on_team_quest_link_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "type_of"
    t.string "value"
    t.integer "message_ref"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "options", force: :cascade do |t|
    t.string "description"
    t.bigint "poll_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_options_on_poll_id"
  end

  create_table "poll_user_links", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "option_id", null: false
    t.bigint "poll_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["option_id"], name: "index_poll_user_links_on_option_id"
    t.index ["poll_id"], name: "index_poll_user_links_on_poll_id"
    t.index ["user_id"], name: "index_poll_user_links_on_user_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "type_of"
    t.string "result"
    t.string "perimeter"
    t.bigint "company_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_polls_on_company_id"
    t.index ["user_id"], name: "index_polls_on_user_id"
  end

  create_table "quest_tag_links", force: :cascade do |t|
    t.bigint "quest_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quest_id"], name: "index_quest_tag_links_on_quest_id"
    t.index ["tag_id"], name: "index_quest_tag_links_on_tag_id"
  end

  create_table "quests", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "criteria"
    t.string "type_of"
    t.string "roulette"
    t.bigint "level_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["level_id"], name: "index_quests_on_level_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "team_quest_links", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "quest_id", null: false
    t.string "status"
    t.text "roulette_result"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quest_id"], name: "index_team_quest_links_on_quest_id"
    t.index ["team_id"], name: "index_team_quest_links_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "values"
    t.integer "points_level", default: 0
    t.integer "points_optional", default: 0
    t.integer "points_votes", default: 0
    t.bigint "company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_teams_on_company_id"
  end

  create_table "user_role_links", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.boolean "on_boarding"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["role_id"], name: "index_user_role_links_on_role_id"
    t.index ["user_id"], name: "index_user_role_links_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.boolean "usage_conditions"
    t.boolean "image_rights"
    t.boolean "on_boarding"
    t.text "description"
    t.bigint "team_id", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["team_id"], name: "index_users_on_team_id"
  end

  create_table "votes", force: :cascade do |t|
    t.boolean "vote"
    t.string "criteria"
    t.bigint "team_quest_link_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_quest_link_id"], name: "index_votes_on_team_quest_link_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "likes", "team_quest_links"
  add_foreign_key "likes", "users"
  add_foreign_key "media", "messages"
  add_foreign_key "media", "team_quest_links"
  add_foreign_key "messages", "users"
  add_foreign_key "options", "polls"
  add_foreign_key "poll_user_links", "options"
  add_foreign_key "poll_user_links", "polls"
  add_foreign_key "poll_user_links", "users"
  add_foreign_key "polls", "companies"
  add_foreign_key "polls", "users"
  add_foreign_key "quest_tag_links", "quests"
  add_foreign_key "quest_tag_links", "tags"
  add_foreign_key "quests", "levels"
  add_foreign_key "team_quest_links", "quests"
  add_foreign_key "team_quest_links", "teams"
  add_foreign_key "teams", "companies"
  add_foreign_key "user_role_links", "roles"
  add_foreign_key "user_role_links", "users"
  add_foreign_key "users", "teams"
  add_foreign_key "votes", "team_quest_links"
  add_foreign_key "votes", "users"
end
