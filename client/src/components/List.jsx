import React from 'react';
import ListItem from './ListItem.jsx';
import { Grid, Image } from 'semantic-ui-react';

const List = (props) => (
  <Grid.Row columns={4}>
    {props.items.map((item, i) => {
      return (
        <Grid.Column>
          <a href={item.recipeUrl}>
            <Image src={item.imageUrl} />
          </a>
        </Grid.Column>
      );
    })}
  </Grid.Row>
);

export default List;
