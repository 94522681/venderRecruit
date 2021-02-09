module.exports = {
  'extends': ['taro/react'],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "Taro"
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "react/sort-comp": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-closing-bracket-location": 0,
    "eslintreact/no-multi-comp": 0,
    "import/prefer-default-export": 0,
    "space-before-function-paren": 0,
    // 函数定义时括号前面要不要有空格
    "semi": [
      1,
      "never"
    ],
    // 语句强制分号结尾
    "no-extra-semi": "error",
    // 多余的分号
    "semi-spacing": [
      1,
      {
        "before": false,
        "after": true
      }
    ],
    // 分后前后空格
    "eqeqeq": "warn",
    // 必须使用全等
    "no-debugger": "error",
    // 禁止使用debugger
    "no-multi-spaces": "warn",
    // 多余的空格
    "eol-last": "warn",
    // 文件以单一的换行符结束
    "quotes": [
      1,
      "single",
      "avoid-escape"
    ],
    // 引号风格
    "no-multiple-empty-lines": [
      1,
      {
        "max": 1
      }
    ],
    // 空行最多不能超过1行
    "no-trailing-spaces": "warn",
    // 一行最后不允许有空格
    "no-mixed-spaces-and-tabs": "error",
    // 混用tab和空格
    "keyword-spacing": "warn",
    // 关键字前后的空格，例如if
    "space-before-blocks": "warn",
    // 块前的空格
    "space-infix-ops": "warn",
    //操作符周围的空格
    "comma-spacing": [
      1,
      {
        "before": false,
        "after": true
      }
    ],
    // 逗号的空格
    "object-curly-spacing": [
      1,
      "always"
    ],
    // 大括号内是否允许不必要的空格
    "space-in-parens": [
      1,
      "never"
    ],
    // 小括号里面要不要有空格
    "key-spacing": [
      1,
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    // 对象字面量中冒号的前后空格
    "spaced-comment": 1,
    // 注释风格有空格
    "arrow-spacing": [
      1,
      {
        "before": true,
        "after": true
      }
    ],
    "array-bracket-spacing": [
      1,
      "never"
    ],
    // [ 之前和 ] 之后不能带空格
    "space-unary-ops": [
      1,
      {
        "words": true,
        "nonwords": false
      }
    ],
    // 一元运算符的前/后要不要加空格
    // "valid-jsdoc": ["warn", {
    //   "requireReturn": false,
    //   "requireParamDescription": false,
    //   "requireReturnDescription": false
    // }], // 强制JSDoc注释
    // "indent": [1, 2], // 缩进风格
    "use-isnan": "error",
    // 禁止比较时使用NaN，只能用isNaN()
    "brace-style": [
      1,
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    // if while function 后面的{必须与if在同一行
    "no-throw-literal": "error",
    // 禁止抛出字面量错误 throw "error"
    "import/no-commonjs": "off",
    "prefer-const": "off",
    "react/no-unused-state": "warn",
    "@typescript-eslint/type-annotation-spacing": "warn",
    "@typescript-eslint/no-use-before-define": "off",
    "react/jsx-tag-spacing": "warn",
    "react/jsx-indent-props": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "Taro"
      }
    ],
    "@typescript-eslint/member-delimiter-style": {
      "multiline": {
        "delimiter": "none",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "none",
        "requireLast": false
      }
    },
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": [
      "warn"
    ],
    "@typescript-eslint/no-inferrable-types": "off"
  },
  "globals": {
    "Partial": true,
    "Readonly": true,
    "Pick": true,
    "Record": true,
    "my": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.json"
  }
}
