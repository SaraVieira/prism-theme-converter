const scopeMap = {
  comment: "comment",
  punctuation: "punctuation",
  "punctuation.section.array": "punctuation",
  string: "string",
  variable: "variable",
  constant: "constant",
  header: "prolog",
  "support.function.magic": "constant",
  "support.variable": "constant",
  "entity.name.type.namespace": "namespace",
  "keyword.operator": "operator",
  "constant.numeric": "number",
  "constant.character.numeric": "number",
  "support.type.vendor.property-name": "property",
  "support.type.property-name": "property",
  "meta.property-list": "property",
  "entity.name.tag": "tag",
  "entity.name.function": "function",
  "entity.name.class": "class-name",
  "entity.name.tag.doctype": "doctype",
  "meta.selector": "selector",
  "entity.other.attribute-name": "attr-name",
  "meta.attribute-selector": "attr-name",
  "constant.other": "constant",
  "constant.other.symbol": "symbol",
  "constant.language.boolean": "boolean",
  "constant.character": "char",
  "meta.tag.html": "tag",
  "meta.tag.js": "tag",
  "support.function": "builtin",
  "support.constant": "builtin",
  "variable.other.constant": "builtin",
  "variable.other.meta.import.js": "imports",
  "variable.other.meta.export.js": "exports",
  "constant.language": "builtin",
  "keyword.control": "keyword",
  "keyword.other": "keyword",
  "string.regexp": "regex",
  "variable.parameter.url": "url",
  "meta.at-rule": "at-rule",
  "source.css.scss": "at-rule",
  "markup.inserted": "inserted",
  "markup.deleted": "deleted",
  "markup.changed": "changed",
  "constant.other.color": "hexcode",
};

const duplicated = {
  "entity.other.attribute-name": "selector",
  constant: "hexcode",
};

export const mapScope = (scope) => {
  // If the scope includes a whitespace, it's a specific
  // type that we don't support
  if (scope.includes(" ")) {
    return undefined;
  }

  const scopeAccess = scope.split(".");

  for (let i = scopeAccess.length; i >= 0; i--) {
    const searchScope = scopeAccess.slice(0, i).join(".");
    const outputScope = scopeMap[searchScope];
    if (outputScope !== undefined) {
      if (duplicated[searchScope]) {
        return [outputScope, duplicated[searchScope]];
      }
      return outputScope;
    }
  }

  return undefined;
};
