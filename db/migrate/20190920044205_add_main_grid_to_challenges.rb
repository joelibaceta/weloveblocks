class AddMainGridToChallenges < ActiveRecord::Migration[6.0]
  def change
    add_column :challenges, :map_grid, :string
    add_column :challenges, :objects_grid, :string
  end
end
