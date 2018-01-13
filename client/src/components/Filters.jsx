import React from 'react';
import _ from 'lodash';
import { Dropdown, Menu } from 'semantic-ui-react';

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cuisineArrays: this.props.results.map((recipe) => recipe.cuisines),
      dietArrays: this.props.results.map((recipe) => recipe.diets),
      mealArrays: this.props.results.map((recipe) => recipe.dishTypes)
    };
  }

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '50px auto' }}>
        <Dropdown text="Filter by:" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Dropdown text="Cuisine">
                <Dropdown.Menu>
                  {_.uniqBy(_.flatten(this.state.cuisineArrays)).map(
                    (cuisine, i) => {
                      return (
                        <Dropdown.Item
                          key={i}
                          onClick={(event, data) =>
                            this.props.onFilter(data.children)
                          }
                        >
                          {cuisine}
                        </Dropdown.Item>
                      );
                    }
                  )}

                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown text="Dietary Restriction">
                <Dropdown.Menu>
                  {_.uniqBy(_.flatten(this.state.dietArrays)).map((diet, i) => {
                    return (
                      <Dropdown.Item
                        key={i}
                        onClick={(event, data) =>
                          this.props.onFilter(data.children)
                        }
                      >
                        {diet}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown text="Meal Type">
                <Dropdown.Menu>
                  {_.uniqBy(_.flatten(this.state.mealArrays)).map(
                    (mealtype, i) => {
                      return (
                        <Dropdown.Item
                          key={i}
                          onClick={(event, data) =>
                            this.props.onFilter(data.children)
                          }
                        >
                          {mealtype}
                        </Dropdown.Item>
                      );
                    }
                  )}

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
