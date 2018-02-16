import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios';

class PersonalFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }

    this.getTrackedArticles = this.getTrackedArticles.bind(this)
  }

  componentDidMount() {
    this.getTrackedArticles()
  }

  getTrackedArticles() {
    let apiVal = `http://5a871976492dc500121b88d9.mockapi.io/articles/`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ articles: response.data })
      })
      .catch((error) => {
        this.setState({ articles: { name: "Tracked Articles get failed" } })
      })
  }

  render() {

    return (
      <div className="personalfeed">
        <div className="row">
          <h1 className="top-title">Personal Feed</h1>
        </div>
        <table className="table scrollable" summary="This summary is for screen readers and should summarize the structure of the table headers and rows">
          <caption className="show-for-sr"></caption>
          <tbody className="tfbody">
            {this.state.articles.map((article, idx) => {
              return (
                <tr key={idx}>
                  <div key={idx} className="row">
                    <div className="small-3 columns">
                      <div className="card">
                        <img className="artcleimg" src={article.urlToImage} alt="Not found"></img>
                      </div>
                    </div>
                    <div className="small-9 columns">
                      <div className="card">
                        <p><label>Title:</label><a href={article.url} target="_blank">{article.title}</a></p>
                        <p><label>Article Author:</label>{article.author}</p>
                        <p><label>Description:</label>{article.description}</p>
                      </div>
                    </div>
                  </div>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

}

export default PersonalFeed
