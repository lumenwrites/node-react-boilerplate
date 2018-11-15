import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
/* General */
html, body, #root {
    font-family: "Open Sans", sans-serif;
    margin:0;
    height: 100%;
}

/* Padding doesn't add to width */
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box; 
}

/* Remove weird outline twitch when you focus on it */
input:focus, textarea:focus, select:focus {
    outline-offset: 0;
}


/* Typography */
h1, h2, h3, h4, h5 {
    margin: 0;
    margin-bottom: 10px;
}
h1 {
    font-size: 1.8em;
    font-weight: lighter;
    border-bottom: 1px solid hsla(223, 18%, 59%, 0.5);    
}
h2 {
    font-size: 1.6em;
    font-weight: 600;
}
h3 {
    font-size: 1.4em;
}
h4 {
    font-size: 1.2em;    
}
h5 {
    font-size: 1em;    
}
p {
    margin-top:0px;
}
a {
    cursor: pointer;
    color: ${props => props.theme.linkColor};
	   &:hover, &:active, &:focus {
	       color: ${props => props.theme.linkColor};
	       svg path {
		   fill: ${props => props.theme.linkColor};
	       }
	   }
}



/* Helpers */
.clearfix::after {
	content: "";
	clear: both;
	display: table;
}
.left { float: left; }
.right { float: right; }
.centered { margin: auto; }
.center-text { text-align: center; }
.no-decoration { text-decoration: none; }
.hidden { display: none; }
.bold { font-weight: bold; }
.italic { font-style: italic; }
.underline { text-decoration: underline; }
.pointer { cursor: pointer; }
.full-width { width: 100%; }
.paddings-20 { padding:20px; }
.small-text { font-size: 12px; }
.dim { color: rgba(112, 126, 148, 0.57);}

/* Elements */
hr {
    border: none;
    border-top: 1px solid rgba(98,24,24,0.2);
    margin: 10px;
}
`

export default GlobalStyle
