import React, { useEffect } from 'react';
import { useHttp } from '../hooks/http';
import Summary from './Summary';

const Character = props => {
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar]);

  let loadedCharacter = null;

  if(fetchedData) {
  loadedCharacter = {
    id: props.selectedChar,
    name: fetchedData.name,
    height: fetchedData.height,
    colors: {
      hair: fetchedData.hair_color,
      skin: fetchedData.skin_color
    },
    gender: fetchedData.gender,
    movieCount: fetchedData.films.length
  };
}

  // lifecycle hook to define when to avoid re-rendering / replace by memoising when exporting 
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     fetchData();
  //   }
  // }


  // useEffect to run upon every re-render, insert [] to avoid infinite loop
  // only when parameter changes, e.g. selectedChar
  // return function to run before every subsequent useEffect
  // useEffect(() => {
  //     fetchData();
  //     return () => {
  //       console.log('run cleanup function...');
  //     }
  // }, [props.selectedChar]);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  // in this case useEffect runs when mount --> no action though
  // and when unmount, as return function added
  useEffect(() => {
    return () => {
      console.log('component will unmount...');
    }
  }, []);

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
      content = (
        <Summary
          name={loadedCharacter.name} 
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (isLoading && loadedCharacter) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  }

// instead of shouldComponentUpdate
// React.memo() to only re-render when props change
export default React.memo(Character);
