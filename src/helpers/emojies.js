const getEmoji = (name) => {
  switch (name) {
    case "Drama":
      return "๐คฉ๏ธ";
    case "Action":
      return "โ๏ธ";
    case "Comedy":
      return "๐๏ธ";
    case "Romance":
      return "๐ฉโโค๏ธโ๐โ๐จ๏ธ";
    case "Horror":
      return "๐ฒ๏ธ";
    case "Adventure":
      return "๐ต๏ธ";
    case "Animation":
      return "๐ฆ๏ธ";
    case "Crime":
      return "๐ง๏ธ";
    case "Documentary":
      return "๐๏ธ";
    case "Family":
      return "๐จโ๐จโ๐งโ๐ฆ๏ธ";
    case "Fantasy":
      return "๐๏ธ";
    case "History":
      return "๐๏ธ";
    case "Music":
      return "๐ต๏ธ";
    case "Mystery":
      return "๐คฏ๏ธ";
    case "Science Fiction":
      return "๐จโ๐ฌ๏ธ";
    case "TV Movie":
      return "๐ฅ๏ธ";
    case "Thriller":
      return "๐ฎ๏ธ";
    case "War":
      return "๐ต๏ธ";
    case "Western":
      return "๐ค ๏ธ";
    default:
      return;
  }
};

export { getEmoji };
