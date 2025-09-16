module.exports = {
    server: {
        baseDir: "./",
        routes: {
            "/node_modules": "node_modules"
        },
        middleware: {
            1: function(req, res, next) {
                // URL decode the request URL
                req.url = decodeURIComponent(req.url);

                // Remove trailing slash except for root
                if (req.url.length > 1 && req.url.endsWith('/')) {
                    req.url = req.url.slice(0, -1);
                }
                
                // Handle root path
                if (req.url === '/') {
                    req.url = '/index.html';
                }
                // Handle /blog path
                else if (req.url === '/blog') {
                    req.url = '/blog/index.html';
                }
                // Handle file paths
                else if (!req.url.match(/\.[0-9a-z]+$/i)) {
                    // Check if this is a blog post with special characters
                    const cleanUrl = req.url.replace(/[&]/g, '-');
                    if (req.url !== cleanUrl) {
                        const fs = require('fs');
                        const possibleFile = '.' + req.url + '.html';
                        const cleanPossibleFile = '.' + cleanUrl + '.html';
                        if (fs.existsSync(possibleFile)) {
                            req.url = req.url + '.html';
                        } else if (fs.existsSync(cleanPossibleFile)) {
                            req.url = cleanUrl + '.html';
                        }
                    } else {
                        req.url = req.url + '.html';
                    }
                }

                next();
            }
        }
    },
    files: ["./**/*.{html,css,js}"],
    open: true,
    reloadDelay: 500,
    reloadDebounce: 500
};