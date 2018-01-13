import _ from 'lodash';
import faker from 'faker';
import React from 'react';
import { Button, Container, Grid, Input, Label } from 'semantic-ui-react';
import List from './List.jsx';

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$')
}));

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      isLoading: false,
      keywords: '',
      servings: 0,
      value: ''
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      value: ''
    });
  }

  handleResultSelect(e) {
    // this.setState({
    //   value: result.title
    // });
  }
  // why destructure result and value
  handleSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      value
    });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      // const isMatch = (result) => {
      //   return re.test(result.title);
      // };

      this.setState({
        isLoading: false
      });
    }, 500);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSearch(
      this.state.budget,
      this.state.keywords,
      this.state.servings
    );
    this.setState({
      budget: 0,
      keywords: '',
      servings: 0
    });
  }

  render() {
    const { isLoading, value } = this.state;
    let start = 0;

    return (
      <div style={{ textAlign: 'center', margin: '0 auto' }}>
        <Container>
          <form onSubmit={this.onSubmit.bind(this)}>
            <Input
              name="budget"
              labelPosition="right"
              type="text"
              placeholder="Amount"
              value={this.state.budget}
              onChange={this.onChange.bind(this)}
            >
              <Label basic>$</Label>
              <input />
              <Label basic>.00</Label>
            </Input>
            <Input
              name="servings"
              label={{ basic: true, content: 'servings' }}
              labelPosition="right"
              placeholder="Enter servings..."
              value={this.state.servings}
              onChange={this.onChange.bind(this)}
            />
            <Input
              name="keywords"
              placeholder="Dish (optional)"
              value={this.state.keywords}
              onChange={this.onChange.bind(this)}
            >
              <input />
              <Button type="submit" color="red" style={{borderRadius:'5px'}}>
                Search
              </Button>
            </Input>
          </form>
          <h4> Recipes </h4>
          <Grid>
            {this.props.results.map((result, i) => {
              if (i % 4 === 0 && i < this.props.results.length - 1) {
                return <List items={this.props.results.slice(i, i + 4)} />;
              }
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default SearchIndex;
