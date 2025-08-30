import React from 'react';
import SuccessChild from './SuccessChild'
import SuccessStory from './SuccessStory';

export default class Success extends React.Component {
  render() {

    const name = "Oscar"
    const address = "America"

    return (
      <div>
        {/* Question No.5's  h1 h2 h3 tags*/}
        <h1>Success</h1>
        <h2>"Discipline beats motivation."</h2>
        <h3>"Small steps every day lead to big results."</h3>

        {/* use props to pass parameters to child components */}
        <SuccessChild name = {name} address = {address} Story={SuccessStory}/>
      </div>
    );
  }
}


