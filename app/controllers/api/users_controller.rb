class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def create
    # render json: user_params
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render json: {user: @user}
      render "api/users/show"
    else
      render json: { errors: @user.errors.full_messages, status: :unprocessable_entity}
    end
  end

  def index
    @users = User.all
    render "api/users/index"
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: {message: "User not found!"}, status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
        render :show
    else
        render json: @user.errors.full_messages, status: 422
    end

  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user
      logout!
      @user.destroy
      render json: {message: "Success!"}
    else
      render json: {message: "User not found!"}, status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end

end