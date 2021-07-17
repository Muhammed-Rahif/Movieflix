const getEmoji = (name) => {
  switch (name) {
    case "Drama":
      return "🤩️";
    case "Action":
      return "⚔️";
    case "Comedy":
      return "😆️";
    case "Romance":
      return "👩‍❤️‍💋‍👨️";
    case "Horror":
      return "😲️";
    case "Adventure":
      return "🚵️";
    case "Animation":
      return "🦁️";
    case "Crime":
      return "😧️";
    case "Documentary":
      return "🗒️";
    case "Family":
      return "👨‍👨‍👧‍👦️";
    case "Fantasy":
      return "🏞️";
    case "History":
      return "📔️";
    case "Music":
      return "🎵️";
    case "Mystery":
      return "🤯️";
    case "Science Fiction":
      return "👨‍🔬️";
    case "TV Movie":
      return "🎥️";
    case "Thriller":
      return "😮️";
    case "War":
      return "😵️";
    case "Western":
      return "🤠️";
    default:
      return;
  }
};

export { getEmoji };
