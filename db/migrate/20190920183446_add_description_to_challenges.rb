class AddDescriptionToChallenges < ActiveRecord::Migration[6.0]
  def change
    add_column :challenges, :description, :string
  end
end
