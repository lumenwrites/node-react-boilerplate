import React from "react"
import { Helmet } from "react-helmet"

class Head extends React.Component {
    render () {
        return (
            <Helmet>
              <title>{process.env.TITLE}</title>
              <meta name="description" content={process.env.DESCRIPTION}/>
              <meta name="keywords" content={process.env.KEYWORDS}/>
              <meta name="author" content={process.env.AUTHOR}/>
              <link rel="shortcut icon" href={process.env.FAVICON}/>
              {/* Facebook */}
              <meta property="og:title" content={process.env.TITLE}/>
              <meta property="og:type" content="website"/>        
              <meta property="og:description"
                    content={process.env.DESCRIPTION}/>
              <meta property="og:url"
                    content={process.env.URL}/>
              <meta property="og:image"
                    content={process.env.SOCIAL_IMAGE}/>
              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:url" content={process.env.URL}/>  
              <meta property="twitter:title" content={process.env.TITLE} />
              <meta property="twitter:description" content={process.env.DESCRIPTION}/>
              <meta property="twitter:creator" content={process.env.AUTHOR_HANDLE} />
              <meta property="twitter:site" content={process.env.PROJECT_HANDLE} />  
              <meta property="twitter:image" content={process.env.SOCIAL_IMAGE}/>
              {/* Fonts */}
              <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,200,300,400" rel="stylesheet"/>
              <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,200,300,400" rel="stylesheet"/>

              
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        )
    }
}

export default Head
