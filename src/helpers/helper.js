import { API_KEY, axios } from "./constants";

const getMovieGenresList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`genre/movie/list?api_key=${API_KEY}`)
      .then((response) => {
        resolve(response.data.genres);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getTvShowsGenresList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`genre/tv/list?api_key=${API_KEY}`)
      .then((response) => {
        resolve(response.data.genres);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUpcomingMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`movie/upcoming?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getPopularMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`movie/popular?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getTopRatedMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`movie/top_rated?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getFamilyEntertainmentMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=10751&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAnimationMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getActionMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getWarMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=10752&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getComedyMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMusicMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=10402&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getHorrorMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getFantasyMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&with_genres=14&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const searchForMovie = (query = "", page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const searchForTvShow = (query = "", page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`search/tv?api_key=${API_KEY}&query=${query}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Get movies by page
const getMovies = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/movie?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {
  getMovies,
  getMovieGenresList,
  getTvShowsGenresList,
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getFamilyEntertainmentMovies,
  getAnimationMovies,
  getActionMovies,
  getWarMovies,
  getComedyMovies,
  getMusicMovies,
  getHorrorMovies,
  getFantasyMovies,
  searchForMovie,
  searchForTvShow,
};
