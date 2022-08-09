import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls, deleteUrls } from '../../apiCalls';
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

  deleteUrl = (id) => {
    deleteUrls(id)
    .then(response=>{
      if (!response.ok) {
        throw Error(response.status)
      } else {
        const filtered = this.state.urls.filter(url => url.id !==id)
        this.setState({urls:filtered})
      }
    })
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
        <UrlContainer urls={this.state.urls} deleteUrl={this.deleteUrl}/>
      </main>
    );
  }
}

export default App;
