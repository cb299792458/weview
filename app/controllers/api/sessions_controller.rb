class Api::SessionsController < ApplicationController
  def show
    # banana
    if current_user
      # render json: {user: current_user}
      @user = current_user
      render "api/users/show"
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:credential],
      params[:password])
    if @user
      login!(@user)
      # render json: {user: @user}
      render "api/users/show"
    else
      render json: { errors: ['Invalid Username/Password Combination'], status: :unauthorized }
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end