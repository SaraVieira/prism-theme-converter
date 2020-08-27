import css from "css";
import camel from "to-camel-case";

export const toSyntaxHighlighter = (data) =>
  css.parse(data).stylesheet.rules.reduce((sheet, rule) => {
    if (rule.type === "rule") {
      const style = rule.selectors.reduce((selectors, selector) => {
        const selectorObject = rule.declarations.reduce(
          (declarations, declaration) => {
            if (declaration.type === "declaration" && declaration.property) {
              const camelCaseDeclarationProp = camel(declaration.property);
              const key =
                camelCaseDeclarationProp.includes("moz") ||
                camelCaseDeclarationProp.includes("webkit") ||
                (camelCaseDeclarationProp[0] === "o" &&
                  !camelCaseDeclarationProp.includes("overflow"))
                  ? `${camelCaseDeclarationProp
                      .substring(0, 1)
                      .toUpperCase()}${camelCaseDeclarationProp.substring(1)}`
                  : camelCaseDeclarationProp;
              declarations[key] = declaration.value;
            }
            return declarations;
          },
          {}
        );

        if (selector.substring(0, 6) === ".token") {
          selector = selector.substring(7);
        }
        selectors[selector] = selectorObject;
        return selectors;
      }, {});
      sheet = Object.keys(style).reduce((stylesheet, selector) => {
        if (stylesheet[selector]) {
          stylesheet[selector] = Object.assign(
            {},
            stylesheet[selector],
            style[selector]
          );
        } else {
          stylesheet[selector] = style[selector];
        }
        return stylesheet;
      }, sheet);
    }
    return sheet;
  }, {});
