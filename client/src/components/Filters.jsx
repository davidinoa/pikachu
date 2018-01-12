import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '50px auto' }}>
        <Dropdown text='Filter by:' pointing className='link item'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Dropdown text='Cuisine'>
                <Dropdown.Menu>
                  <Dropdown.Item>Mexican</Dropdown.Item>
                  <Dropdown.Item>Vietnamese</Dropdown.Item>
                  <Dropdown.Item>Japanese</Dropdown.Item>
                  <Dropdown.Item>Italian</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown text='Diet'>
                <Dropdown.Menu>
                  <Dropdown.Item>Vegan</Dropdown.Item>
                  <Dropdown.Item>Vegatarian</Dropdown.Item>
                  <Dropdown.Item>Gluten-free</Dropdown.Item>
                  <Dropdown.Item>Whole 30</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown text='Meal'>
                <Dropdown.Menu>
                  <Dropdown.Item>Breakfast</Dropdown.Item>
                  <Dropdown.Item>Lunch</Dropdown.Item>
                  <Dropdown.Item>Dinner</Dropdown.Item>
                  <Dropdown.Item>Snack</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Filters;