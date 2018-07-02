import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const BookCard = ({ book }) => (
  <Card>
    <Image src={book.covers} />
    <Card.Content>
      <Card.Header>{book.title}</Card.Header>
      <Card.Meta>{book.authors}</Card.Meta>
      <Card.Description>{book.pages} pages</Card.Description>
    </Card.Content>
  </Card>
);

export default BookCard;
