class AddKeynameToChallenges < ActiveRecord::Migration[6.0]
  def change
    add_column :challenges, :keyname, :string
  end
end
