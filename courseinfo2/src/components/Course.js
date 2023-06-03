import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';

const Course = ({course}) => {
  return(
    <div>
        <Header name={course.name} />
        <Content contents={course.parts} />
        <Total contents={course.parts} />
    </div>
  )
}

export default Course;