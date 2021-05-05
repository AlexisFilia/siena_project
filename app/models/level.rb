class Level < ApplicationRecord
  has_many :quests, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: {
    message: 'This level name already exists in the DB.'
  }

  def get_quests_list_ordered_by_status(team)

    level_quests_with_status = self.quests.map{|q| {quest: q , status: team.get_quest_status(q)}}
    quests_list_ordered_by_status = []

    open_quests = level_quests_with_status.select{|q| q[:status] == "open"}
    quests_list_ordered_by_status << open_quests unless open_quests.empty?

    draft_quests = level_quests_with_status.select{|q| q[:status] == "draft"}
    quests_list_ordered_by_status << draft_quests unless draft_quests.empty?

    rejected_quests = level_quests_with_status.select{|q| q[:status] == "rejected"}
    quests_list_ordered_by_status << rejected_quests unless rejected_quests.empty?

    pending_quests = level_quests_with_status.select{|q| q[:status] == "pending"}
    quests_list_ordered_by_status << pending_quests unless pending_quests.empty?

    completed_quests = level_quests_with_status.select{|q| q[:status] == "completed"}
    quests_list_ordered_by_status << completed_quests unless completed_quests.empty?

    return quests_list_ordered_by_status.flatten
  end
end
