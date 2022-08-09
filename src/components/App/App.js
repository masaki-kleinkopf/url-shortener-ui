import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error:""
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({urls:data.urls}))
    .catch(err => this.setState({error:err.message}))
  }

  addUrl = (url) => {
    postUrls(url)
    .then(data => this.setState({urls:[...this.state.urls, data]}))
    .catch(err => this.setState({error:err.message}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm  addUrl={this.addUrl}/>
        </header>
        {this.state.error && <p>something went wrong!</p>}
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
