'use strict';

var bitballoon = require("bitballoon"),
    grunt      = require('grunt'),
    _          = grunt.util._;

var DeployTask = function (origTask) {
  this._origTask = origTask;
};

DeployTask.prototype = {
  run: function() {
    var config = this.getConfig();

    if (!config.src) {
      return config.logErrors && grunt.log.error("No src folder for grunt-bitballoon - skipping deploy");
    }
    if (!config.token) {
      return config.logErrors && grunt.log.error("No token for grunt-bitballoon - skipping deploy");
    }
    if (!config.site) {
      return config.logErrors && grunt.log.error("No site for grunt-bitballoon - skipping deploy");
    }

    client = bitballoon.createClient({access_token: config.token});

    client.site(config.site.replace(/^https?:\/\//, '').replace(/\/$/, ""), function(err, site) {
        if (err) {
          return config.logErrors && grunt.log.error("Site not found - skipping deploy");
        }

        grun.logSuccess && grunt.log.ok("Deploying to BitBalloon");
        site.update({dir: config.src}, function(err) {
          if (err) {
            return config.logErrors && grunt.log.error("Error during deploy", err);
          }

          config.logSuccess && grunt.log.ok("Site deployed to " + site.url);
        });
      });
  },

  getConfig: function() {
    // Grab the options for this task.
    var opts = this._origTask.options();

    var defaultOpts = {
      token: process.env.BB_TOKEN,
      site: process.env.BB_SITE,
      logSuccess: true,
      logErrors: true
    };

    // Combine the options and fileActions as the config
    return _.extend({}, defaultOpts, opts);
  }
}

module.exports = DeployTask;
