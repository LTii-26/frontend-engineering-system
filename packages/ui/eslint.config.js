import reactConfig from "@frontend-engineering-system/eslint-config/react";
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";


export default [...reactConfig, ...storybook.configs["flat/recommended"]]