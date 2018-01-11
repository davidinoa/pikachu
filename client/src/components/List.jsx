import React from 'react';
import ListItem from './ListItem.jsx';
import { Grid, Image } from 'semantic-ui-react';

const List = (props) => (
  <div>
    <h4> Recipes </h4>
    There are {props.items.length} items.
    {props.items.map((item, i) => {
      return (
        <Grid.Column>
          <a href={item.recipeUrl}>
            <Image src={item.imageUrl} />
            <ListItem item={item} onClick={props.onClick} />
          </a>
        </Grid.Column>
      );
    })}
  </div>
);

export default List;
