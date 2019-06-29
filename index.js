'use strict';

const broccoliStew = require('broccoli-stew');

class FastbootTransform {
  /**
   * This addon is used to register a custom Fastboot transform for app and addons to use.
   *
   * @class FastbootTransform
   * @constructor
   */
  constructor(project) {
    this.project = project;
    this.name = 'fastboot-transform';
  }

  importTransforms() {
    return {
      'fastboot': {
        transform: (tree, options) => {
          return broccoliStew.map(tree, (content, relativePath) => {
            return `if (typeof FastBoot === 'undefined') { ${ content } }`;
          });
        },

        processOptions(assetPath, entry, options) {
          return options;
        }
      }
    };
  }
}

module.exports = FastbootTransform;
