import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import SearchIndex from './components/SearchIndex.jsx';
import Filters from './components/Filters.jsx';
import { Button, Container, Grid, Header, Image } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      originalItems: []
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
        // console.log(
        //   'these are the new items, items being set to state: ',
        //   data
        // );
        if (data) {
          this.setState({
            items: [...data],
            originalItems: [...that.state.items, ...data]
          });

        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, 'post request error: ', errorThrown);
      });
  }

  filter(option) {
    new Promise((resolve, reject) => {
      resolve(
        this.setState({
          items: this.state.originalItems
        })
      );
    }).then(() => {
      let filteredItems = this.state.items.filter(item => {
        return (item.cuisines.includes(option) || item.dishTypes.includes(option) || item.diets.includes(option));
      });

      this.setState({
        items: filteredItems
      });
    });
  }

  render() {
    let filters;

    if (this.state.items.length > 0) {
      filters = (
        <Filters onFilter={this.filter.bind(this)} results={this.state.items} />
      );
    } else {
      console.log('no matches.');
    }

    return (
      <div>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            width: 'calc(100wh)',
            height: 'calc(35vh)',
            backgroundImage: 'url(https://i.imgur.com/74RuLGN.jpg)',
            backgroundSize: 'cover',
            textAlign: 'center'
          }}
        >
          <Image size="medium" src="https://i.imgur.com/hbpXFsF.png" />
          <SearchIndex
            results={this.state.items}
            onSearch={this.search.bind(this)}
          />
        </div>
        <Container style={{ textAlign: 'center' }}>
          <h4> Recipes </h4>
          {filters}
          <Grid>
            {this.state.items.map((item, i) => {
              if (i % 4 === 0 && i < this.state.items.length - 1) {
                return <List items={this.state.items.slice(i, i + 4)} />;
              }
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// search bars
// search button
// filters
