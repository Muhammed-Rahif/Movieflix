import { API_KEY, axios } from "./constants";
import Axios from "axios";

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

// Get movies by page
const getTvShows = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`discover/tv?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Get one of the movie or tv show details
const getMovieOrShowDetails = (id, type = "movie") => {
  return new Promise((resolve, reject) => {
    Axios.all([
      axios.get(`${type}/${id}?api_key=${API_KEY}`),
      axios.get(`${type}/${id}/videos?api_key=${API_KEY}`),
    ])
      .then(
        Axios.spread((details, videos) => {
          resolve({ ...details.data, videos: videos.data.results });
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};

// Convert minutes to hours
const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}:${m}`;
};

// Convert a whole number to words
const a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
const b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
function convertNumToWord(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}

export {
  convertMinsToHrsMins,
  getMovieOrShowDetails,
  convertNumToWord,
  getMovies,
  getTvShows,
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
