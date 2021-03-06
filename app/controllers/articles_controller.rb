class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update]

  def draft
    render layout: false
  end

  def index
    @articles = Article.all.order(updated_at: :desc).page(params[:page]).per(params[:per_page] || 5)

    respond_to do |format|
      format.html
      format.json do
        pagination = {
          current_page: @articles.current_page,
          total_pages: @articles.total_pages,
        }
        render_json(@articles, pagination: pagination)
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        render json: @article
      end
    end
  end

  def new
    @article = Article.new
  end

  def edit

  end

  def create
    @article = Article.new(articles_params)

    if @article.save
      respond_to do |format|
        format.html { redirect_to @article }
        format.json { render json: @article }
      end
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: {errors: @article.errors}, status: :unprocessable_entity }
      end
    end
  end

  def update
    if @article.update(articles_params)

      respond_to do |format|
        format.html { redirect_to @article }
        format.json { render json: @article }
      end
    else
      respond_to do |format|
        format.html { render 'edit' }
        format.json { render json: @article }
      end

    end
  end

  private

  def articles_params
    params.require(:article).permit(
      :title,
      :content,
      :status,
    )
  end

  def set_article
    @article = Article.find(params[:id])
  end

end
