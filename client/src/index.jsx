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
      success: (data) => {
        this.setState({
          items: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1></h1>
      <SearchIndex />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// search bars
// search button
// filters
