import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "code[class*=\"language-\"]": {
        "color": "#f8f8f2",
        "background": "none",
        "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
        "fontFamily": "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        "textAlign": "left",
        "whiteSpace": "pre",
        "wordSpacing": "normal",
        "wordBreak": "normal",
        "wordWrap": "normal",
        "lineHeight": 1.5,
        "MozTabSize": 4,
        "OTabSize": 4,
        "tabSize": 4,
        "WebkitHyphens": "none",
        "MozHyphens": "none",
        "MsHyphens": "none",
        "hyphens": "none"
    },
    "pre[class*=\"language-\"]": {
        "color": "#f8f8f2",
        "background": "#272822",
        "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
        "fontFamily": "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        "textAlign": "left",
        "whiteSpace": "pre",
        "wordSpacing": "normal",
        "wordBreak": "normal",
        "wordWrap": "normal",
        "lineHeight": 1.5,
        "MozTabSize": 4,
        "OTabSize": 4,
        "tabSize": 4,
        "WebkitHyphens": "none",
        "MozHyphens": "none",
        "MsHyphens": "none",
        "hyphens": "none",
        "paddingTop": 1,
        "paddingRight": 1,
        "paddingBottom": 1,
        "paddingLeft": 1,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "auto",
        "borderRadius": 0
    },
    ":not(pre) > code[class*=\"language-\"]": {
        "background": "#272822",
        "paddingTop": 0.1,
        "paddingRight": 0.1,
        "paddingBottom": 0.1,
        "paddingLeft": 0.1,
        "borderRadius": 0.3,
        "whiteSpace": "normal"
    },
    "tokencomment": {
        "color": "slategray"
    },
    "tokenprolog": {
        "color": "slategray"
    },
    "tokendoctype": {
        "color": "slategray"
    },
    "tokencdata": {
        "color": "slategray"
    },
    "tokenpunctuation": {
        "color": "#f8f8f2"
    },
    "namespace": {
        "opacity": 0.7
    },
    "tokenproperty": {
        "color": "#f92672"
    },
    "tokentag": {
        "color": "#f92672"
    },
    "tokenconstant": {
        "color": "#f92672"
    },
    "tokensymbol": {
        "color": "#f92672"
    },
    "tokendeleted": {
        "color": "#f92672"
    },
    "tokenboolean": {
        "color": "#ae81ff"
    },
    "tokennumber": {
        "color": "#ae81ff"
    },
    "tokenselector": {
        "color": "#a6e22e"
    },
    "tokenattr-name": {
        "color": "#a6e22e"
    },
    "tokenstring": {
        "color": "#a6e22e"
    },
    "tokenchar": {
        "color": "#a6e22e"
    },
    "tokenbuiltin": {
        "color": "#a6e22e"
    },
    "tokeninserted": {
        "color": "#a6e22e"
    },
    "tokenoperator": {
        "color": "#f8f8f2"
    },
    "tokenentity": {
        "color": "#f8f8f2",
        "cursor": "help"
    },
    "tokenurl": {
        "color": "#f8f8f2"
    },
    "language-css tokenstring": {
        "color": "#f8f8f2"
    },
    "style tokenstring": {
        "color": "#f8f8f2"
    },
    "tokenvariable": {
        "color": "#f8f8f2"
    },
    "tokenatrule": {
        "color": "#e6db74"
    },
    "tokenattr-value": {
        "color": "#e6db74"
    },
    "tokenfunction": {
        "color": "#e6db74"
    },
    "tokenkeyword": {
        "color": "#66d9ef"
    },
    "tokenregex": {
        "color": "#fd971f"
    },
    "tokenimportant": {
        "color": "#fd971f",
        "fontWeight": "bold"
    },
    "tokenbold": {
        "fontWeight": "bold"
    },
    "tokenitalic": {
        "fontStyle": "italic"
    }
});