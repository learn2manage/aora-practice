interface Images {
  [key: string]: string;
}

const profile: string = require("../assets/images/profile.png");
const thumbnail: string = require("../assets/images/thumbnail.png");
const cards: string = require("../assets/images/cards.png");
const path: string = require("../assets/images/path.png");
const logo: string = require("../assets/images/logo.png");
const logoSmall: string = require("../assets/images/logo-small.png");
const empty: string = require("../assets/images/empty.png");

const images: Images = {
  profile,
  thumbnail,
  cards,
  path,
  logo,
  logoSmall,
  empty,
};

export default images;