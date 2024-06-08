import { ImageSourcePropType } from 'react-native';

interface Images {
  [key: string]: ImageSourcePropType;
}

const profile: ImageSourcePropType = require("../assets/images/profile.png");
const thumbnail: ImageSourcePropType = require("../assets/images/thumbnail.png");
const cards: ImageSourcePropType = require("../assets/images/cards.png");
const path: ImageSourcePropType = require("../assets/images/path.png");
const logo: ImageSourcePropType = require("../assets/images/logo.png");
const logoSmall: ImageSourcePropType = require("../assets/images/logo-small.png");
const empty: ImageSourcePropType = require("../assets/images/empty.png");

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