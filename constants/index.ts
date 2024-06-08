import { ImageSourcePropType } from 'react-native';
import importedIcons from "./icons";
import importedImages from "./images";

interface Icons {
  [key: string]: string;
}

interface Images {
  [key: string]: ImageSourcePropType;
}

export const icons: Icons = importedIcons;
export const images: Images = importedImages;