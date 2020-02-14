export function UniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


export const cleanUrl = str => {
    if(!str.startsWith('http') || !str.startsWith("https")) {
        str = "http://" + str
    }
    return str
}

export const parserForUrl = urlString => {
    const parser = document.createElement('a')
    parser.href = urlString
    return {
        protocol: parser.protocol, // => "http:"
        hostname: parser.hostname, // => "example.com"
        port: parser.port,     // => "3000"
        pathname: parser.pathname, // => "/pathname/"
        search: parser.search,  // => "?search=test"
        hash: parser.hash,   // => "#hash"
        host: parser.host
    }
}