import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import SearchIndex from './components/SearchIndex.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: data => {
        this.setState({
          items: data
        });
      },
      error: err => {
        console.log('err', err);
      }
    });
  }

  search(budget, keywords, servings) {}

  render() {
    return (
      <div>
        <h1 />
        <SearchIndex onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// search bars
// search button
// filters
