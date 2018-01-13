import React from 'react';
import ListItem from './ListItem.jsx';
import { Grid, Image } from 'semantic-ui-react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  setButtonHovered(bool) {
    this.state.hover = bool;
    if (this.state.hover === true) {
    }
  }
  render() {
    return (
      <Grid.Row columns={4}>
        {this.props.items.map((item, i) => {
          return (
            <Grid.Column
              onMouseEnter={() => this.setButtonHovered(true)}
              onMouseLeave={() => this.setButtonHovered(false)}
            >
              <div style={{ float: 'left', position: 'relative' }}>
                <a href={item.recipeUrl}>
                  <Image src={item.imageUrl} style={{ borderRadius: '10px' }} />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '0px',
                      width: '100%',
                      backgroundColor: 'black',
                      color: 'white',
                      opacity: '0.6',
                      filter: 'alpha(opacity=60)'
                    }}
                  >
                    <p
                      style={{
                        filter: 'alpha(opacity=50)',
                        padding: '10px',
                        margin: '0px'
                      }}
                    >
                      {item.recipeName} Price (per Serving):{item.servingPrice}{' '}
                    </p>
                  </div>
                </a>
              </div>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    );
  }
}

export default List;
