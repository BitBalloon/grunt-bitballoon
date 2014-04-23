/*
 * grunt-bitballoon
 * https://github.com/BitBalloon/grunt-bitballoon
 *
 * Copyright (c) 2014 Mathias Biilmann Christensen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var DeployTask = require('./lib/deployTask');

  grunt.registerMultiTask('bitballoon', 'Deploy to BitBalloon', function() {
    var task = new DeployTask(this);

    task.run();
  });
};
