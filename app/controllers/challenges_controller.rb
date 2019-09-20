require 'securerandom'

class ChallengesController < ApplicationController 

  skip_before_action :verify_authenticity_token

  # GET /challenges
  # GET /challenges.json
  def index
    @challenges = Challenge.all
  end

  # GET /challenges/1
  # GET /challenges/1.json
  def show
    @challenge = Challenge.find_by_keyname(params[:keyname]) || Challenge.new
    @challenge.keyname = params[:keyname];
    @challenge.unique = SecureRandom.uuid unless @challenge.unique
    @challenge.save
  end
 
  # PATCH/PUT /challenges/1
  # PATCH/PUT /challenges/1.json
  def update
    puts "params"
    puts request.request_parameters

    @challenge = Challenge.find_by_keyname(params[:keyname])
    @challenge.map_grid = params[:map_grid]
    @challenge.objects_grid = params[:objects_grid]
    @challenge.description = params[:description]

    @challenge.save
    
  end

  def play
    @challenge = Challenge.find_by_unique(params[:unique])

    
  end
 

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_challenge
      
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    # def challenge_params
    #   params.fetch(:challenge, {:map_grid, :objects_grid})
    # end
end
