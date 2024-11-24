import React from 'react';

const b = 3


export const Function = () => {
  return (
    <div>
      {
        ((param) => {
          return 1
        })({
          s: () => {
          }

        }) === 1 ? (<div></div>) : (<div></div>)


      }
      {1 === Math.random() ? (
        <div></div>
      ) : (
        <></>
      )}
    </div>
  );
};