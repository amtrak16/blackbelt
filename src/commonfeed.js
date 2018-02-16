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

class CommonFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }

    this.getarticles = this.getarticles.bind(this)
  }

  componentDidMount() {
    this.getarticles()
  }

  getarticles() {
    let apiVal = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2ff4023aa16d4136b52e6736aa3df446`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ articles: response.data.articles })
      })
      .catch((error) => {
        this.setState({ articles: { name: "Top 20 Headlines get failed" } })
      })
  }

  render() {

    return (
      <div className="commonarticles">
        <div className="row">
          <h1 className="top-title">Top Headlines</h1>
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
                        <img className="flagimg" src={article.urlToImage} alt="Not found"></img>
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

export default CommonFeed
