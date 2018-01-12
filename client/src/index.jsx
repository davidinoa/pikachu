import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import SearchIndex from './components/SearchIndex.jsx';
import { Button, Header, Image } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/recipes',
      contentType: 'application/json',
      success: (data) => {
        console.log('this is component did mount data: ', data);
        this.setState({
          items: data
        });
      },
      error: (err) => {
        console.log('get request error: ', err);
      }
    });
  }

  search(budget, keywords, servings) {
    console.log(`${budget} ${keywords} ${servings} was added`);
    var that = this;
    $.ajax({
      method: 'POST',
      url: '/recipes',
      data: JSON.stringify({
        budget: budget,
        keywords: keywords,
        servings: servings
      }),
      contentType: 'application/json'
    })
      .done((data) => {
        // debugger;
        console.log(
          'these are the new items, items being set to state: ',
          data
        );
        if (data) {
          this.setState({ items: [...that.state.items, data] });
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, 'post request error: ', errorThrown);
      });
  }

  render() {
    return (
      <div>
        <Button.Group floated="right">
          <Button basic color="olive">
            User
          </Button>
          <Button basic color="olive">
            Favorites
          </Button>
          <Button basic color="olive">
            Login / Logout
          </Button>
        </Button.Group>
        <h1 />
        <Header as="h2" textAlign="center">
          <Image src="https://drive.google.com/file/d/1Fa0LLTFj8Vg-lBPGOqizvQhKKuowZtOv/view?usp=sharing" />
          BudgetChef
          <Header.Subheader>for when you're cheap AF</Header.Subheader>
        </Header>
        <SearchIndex onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// search bars
// search button
// filters
