import React from "react"
import { connect } from "react-redux"
import { updateArticleForm, updateArticle } from "../reducers/root"

class ArticleEdit extends React.Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    const { article, updateArticleForm } = this.props

    const edited = Object.assign({}, article, {
      [e.target.name]: e.target.value
    })

    updateArticleForm(edited)
  }

  onSubmit(e) {
    e.preventDefault()
    const { article, updateArticle } = this.props
    updateArticle(article)
  }

  render() {
    const { article } = this.props
    return (
      <div>
        <h2>Article Edit #{article.id} {article.title}</h2>

        <form action="" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" name="title" value={article.title} className="form-control" onChange={this.onChange} />
          </div>

          <div className="form-group">
            <textarea name="content" value={article.content} className="form-control" onChange={this.onChange} rows="6"></textarea>
          </div>

          <button className="btn btn-outline-primary">Save</button>
        </form>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    article: state.forms.articleForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateArticleForm: (article) => {
      dispatch(updateArticleForm(article))
    },
    updateArticle: (article) => {
      dispatch(updateArticle(article))
    },
  }
}

export const ArticleEditCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleEdit)
