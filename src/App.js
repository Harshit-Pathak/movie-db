import React,{useState,useEffect} from 'react';
import MovieList from './components/MovieList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App=()=>{
  const[movies,setMovies]=useState([])
  const[favourites,setFavourites]=useState([]);
  const [searchValue,setSearchValue]=useState('');

  const getMovieRequest=async(searchValue)=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=ad14bbc5`;

    const response=await fetch(url);

    const responseJson=await response.json();

    if(responseJson.Search)
    {
      setMovies(responseJson.Search);
    }
  };
  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const movieFavourites=JSON.parse(
      localStorage.getItem('react-movie-db-favourites'));
    if(movieFavourites)
    {
      setFavourites(movieFavourites);
    }
  },[]);

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-db-favourites',JSON.stringify(items));
  }



  const addFavourite=(movie)=>{
    const newFavouriteList=[...favourites,movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavourite=(movie)=>{
    const newFavouriteList=favourites.filter(
      (favourite)=>favourite.imdbID !== movie.imdbID);
      
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
      
  };
  return(
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="CINEFLIX"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList movies={movies} handleFavouritesClick={addFavourite} favouriteComponent={AddFavourites}/>
      </div>
      
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites"/>
      </div>
      <div className="row">
        <MovieList movies={favourites} handleFavouritesClick={removeFavourite} favouriteComponent={RemoveFavourites}/>
      </div>
      
    </div>
  );
}

export default App;
