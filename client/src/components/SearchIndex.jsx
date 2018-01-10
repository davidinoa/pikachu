import _ from 'lodash';
import faker from 'faker';
import React from 'react';
import { Search, Grid, Header } from 'semantic-ui-react';

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}));

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: ''
    });
  }

  handleResultSelect(e, { result }) {
    this.setState({
      value: result.title
    });
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
      const isMatch = (result) => {
        return re.test(result.title);
      };

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div style={{textAlign: 'center', margin: '0 auto'}}>
        <Grid>
          <Grid.Column width={8}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect.bind(this)}
              onSearchChange={this.handleSearchChange.bind(this)}
              results={results}
              value={value}
              {...this.props}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SearchIndex;
