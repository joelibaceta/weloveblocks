class AddUniqueToChallenges < ActiveRecord::Migration[6.0]
  def change
    add_column :challenges, :unique, :string
  end
end
