var fs = require('fs');
var config = require('../../config');
var async = require('async');
var _ = require('lodash');

function renderStaticHtmlFile (path) {
    return function (req, res, next) {
        fs.createReadStream(__dirname + '/../../frontend/' + path)
            .pipe(res);
    }
}

function swaggerConfig (req, res, next) {
    var base = require('./../../frontend/swagger/api.json');
    var apiDir = require('path').resolve(__dirname + '/../../frontend/swagger/api');
    var parts = fs.readdirSync(apiDir);

    async.each(parts, function (filename, cb) {
        var part = require(apiDir + '/' + filename);

        if ( part.tags ) {
            base.tags.push(part.tags[0]);
        }

        base.paths = _.extend(base.paths, part.paths);
        base.definitions = _.extend(base.definitions, part.definitions);

        cb();
    }, function (err) {
        res.send(base);
    })
}

module.exports = {
    app: renderStaticHtmlFile('dist/app/index.html')
};