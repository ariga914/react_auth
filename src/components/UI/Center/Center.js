import React from 'react';

function Center(props) {
  return (
    <div className={classes.actions}>
      {props.children}
    </div>
  );
}

export default Center;