const COLORS = {
  white: "#fcfcfcff",
  blue: "#3c91e6ff",
  black: "#342e37ff",
  green: "#48bf84ff",
  red: "#CE3F31",
  pureWhite: "#fff",
  gray: "#ddd",
  darkGray: "#555",
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",
  lightBlue: "#75a8f0",
  backgroundColor: "#f2f2f2",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const FONT = {
  regular: "",
  medium: "",
  bold: "",
};

export { COLORS, SIZES, SHADOWS, FONT };
