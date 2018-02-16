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

class Customize extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      trackedArticles: [],
      curCategory: 'Business',
      categories: ['Business', 'Technology', 'Science']
    }

    this.getArticles = this.getArticles.bind(this)
    this.onCatChange = this.onCatChange.bind(this)
    this.onSubscribe = this.onSubscribe.bind(this)
    this.putNewArticle = this.putNewArticle.bind(this)
    this.getTrackedArticles = this.getTrackedArticles.bind(this)
  }

  componentDidMount() {
    // this.setState({curCategory: "science"})
    this.getArticles(this.state.curCategory)
    this.getTrackedArticles()
  }

  componentWillReceiveProps(nextProps) {
    this.getArticles()
    this.getTrackedArticles()
  }

  getArticles(category) {
    let apiVal = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=2ff4023aa16d4136b52e6736aa3df446`
    axios.get(apiVal)
      .then((response) => {
        console.log(response)
        this.setState({ articles: response.data.articles, articlesExist: true })
      })
      .catch((error) => {
        this.setState({ articles: { name: "Category articles get failed" }, articlesExist: false })
      })
  }

  getTrackedArticles() {
    let apiVal = `http://5a871976492dc500121b88d9.mockapi.io/articles/`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ trackedArticles: response.data })
      })
      .catch((error) => {
        this.setState({ trackedArticles: { name: "Tracked Articles get failed" } })
      })
  }

  onCatChange(evt) {
    console.log(evt.target.value)
    this.setState({ curCategory: evt.target.value })
    this.getArticles(evt.target.value)
  }

  onSubscribe(evt) {
    // const newTrackedArticle = {}
    // numericCode: this.state.articles[evt.target.id].numericCode,
    // name: this.state.articles[evt.target.id].name,
    // capital: this.state.articles[evt.target.id].capital,
    // population: this.state.articles[evt.target.id].population,
    // flag: this.state.articles[evt.target.id].flag
    const newTrackedArticle = this.state.articles[evt.target.id]
    this.putNewArticle(newTrackedArticle)
  }

  putNewArticle(newTrackedArticle) {
    let apiVal = `http://5a871976492dc500121b88d9.mockapi.io/articles/`
    axios.post(apiVal, newTrackedArticle)
      .then((response) => {
        let curtrackedArticles = this.state.trackedArticles.slice()
        curtrackedArticles.push(newTrackedArticle)
        this.setState({ trackedArticles: curtrackedArticles })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ trackedArticles: { name: 'Failed to put tracked article.' } })
      })
  }

  render() {

    return (
      <div className="customize">
        <h1 className="top-title">Select your Sources!</h1>
        <div className="top-title" id="radBox">
          <input type="radio" id="radBus" name="radCategory" value="Business" onChange={this.onCatChange} />
          <label for="radBus">Business</label>
          <input type="radio" id="radTech" name="radCategory" value="Technology" onChange={this.onCatChange} />
          <label for="radTech">Technology</label>
          <input type="radio" id="radSci" name="radCategory" value="Science" onChange={this.onCatChange} />
          <label for="radSci">Science</label>
        </div>
        <h1 className="top-title">{this.state.curCategory} Sources</h1>

        <table className="table scrollable" summary="This summary is for screen readers and should summarize the structure of the table headers and rows">
          <caption className="show-for-sr"></caption>
          <thead>
            <tr>
              <th width="50px">Name</th>
              <th width="50px">Description</th>
              <th width="50px"></th>
            </tr>
          </thead>
          <tbody className="tbody">
            {this.state.articles.map((article, idx) => {
              return (
                <tr key={idx}>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>
                    {this.state.trackedArticles.filter(trackedArticle => (article.title === trackedArticle.title)).length > 0 ?
                      <button id={idx} className="trackedbtn" onClick={this.onSubscribe} disabled="true">Subscribed</button> :
                      <button id={idx} className="trackbtn" onClick={this.onSubscribe} >Subscribe</button>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div >
    )
  }

}

export default Customize
