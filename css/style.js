import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "fontSize": "100%",
        "overflowY": "scroll",
        "WebkitTapHighlightColor": "rgba(0,0,0,0)",
        "MsTextSizeAdjust": "100%",
        "WebkitTextSizeAdjust": "none"
    },
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontSize": 14,
        "lineHeight": 1.61,
        "fontWeight": "400",
        "fontFamily": "'Open Sans', sans-serif",
        "color": "#333",
        "background": "#fff"
    },
    "button": {
        "fontFamily": "'Open Sans', sans-serif",
        "color": "#333"
    },
    "input": {
        "fontFamily": "'Open Sans', sans-serif",
        "color": "#333"
    },
    "select": {
        "fontFamily": "'Open Sans', sans-serif",
        "color": "#333"
    },
    "textarea": {
        "fontFamily": "'Open Sans', sans-serif",
        "color": "#333"
    },
    "a": {
        "color": "#12C"
    },
    "a:visited": {
        "color": "#61C"
    },
    "a:focus": {
        "outline": "thin dotted"
    },
    "a:hover": {
        "color": "#c00",
        "outline": 0
    },
    "a:active": {
        "color": "#c00",
        "outline": 0
    },
    "b": {
        "fontWeight": "bold"
    },
    "strong": {
        "fontWeight": "bold"
    },
    "pre": {
        "fontFamily": "monospace, monospace",
        "fontSize": 1
    },
    "code": {
        "fontFamily": "monospace, monospace",
        "fontSize": 1
    },
    "ul": {
        "marginTop": 1,
        "marginRight": 0,
        "marginBottom": 1,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 20
    },
    "ol": {
        "marginTop": 1,
        "marginRight": 0,
        "marginBottom": 1,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 20
    },
    "img": {
        "border": 0,
        "maxWidth": "100%"
    },
    "header": {
        "maxWidth": 45,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "paddingTop": 0,
        "paddingRight": 0.5,
        "paddingBottom": 0,
        "paddingLeft": 0.5,
        "color": "#C90B0B"
    },
    "footer": {
        "maxWidth": 45,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "paddingTop": 0,
        "paddingRight": 0.5,
        "paddingBottom": 0,
        "paddingLeft": 0.5,
        "borderTop": "1px solid #ccc"
    },
    "container": {
        "maxWidth": 45,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "header img": {
        "borderRadius": 40,
        "float": "left"
    },
    "header p": {
        "fontSize": 1.5,
        "fontWeight": "bold",
        "paddingLeft": 4
    },
    "header p span": {
        "fontSize": 0.8,
        "fontWeight": "normal"
    },
    "hero": {
        "paddingTop": 2,
        "paddingRight": 2,
        "paddingBottom": 2,
        "paddingLeft": 2,
        "backgroundColor": "#f8f8f8",
        "fontSize": 1.2,
        "borderBottom": "1px solid #ccc",
        "borderTop": "1px solid #ccc"
    },
    "content": {
        "paddingTop": 1,
        "paddingRight": 1,
        "paddingBottom": 1,
        "paddingLeft": 1
    },
    "content li": {
        "listStyleType": "none",
        "fontSize": 1.1
    },
    "li img": {
        "float": "left",
        "paddingRight": 1
    },
    "li p": {
        "fontSize": 0.9,
        "fontStyle": "italic"
    },
    "footer span": {
        "float": "right",
        "fontStyle": "italic"
    }
});