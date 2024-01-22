import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CardForPage } from '../components';

// React component that renders the component StartPage with
// a list of pages. Each page has a title, description, image and path
// (path is used to navigate to the page). There is a welcome message:
// "Welcome to AWSomeMath - try our calculators"
//
// example:
//   <StartPage pages={pages}>
//
// props:
//   pages: Array of objects with the following properties:
//     title: String
//     description: String
//     path: String
//     image: String

export default function StartPage(props) {
  return (
    <Container fluid>
      <h1 className='border-bottom'>Welcome to AWSomeMath - try our calculators</h1>
      <Row className='my-4'>
        {props.pages?.map((page, idx) => (
          <Col md='auto' key={idx}>
            <CardForPage {...page} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
