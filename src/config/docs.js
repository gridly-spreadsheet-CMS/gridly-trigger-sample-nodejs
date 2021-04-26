'use strict';
const debug = require('debug')('API:docs');

const groupApi = routers => {
  return (routers || []).reduce((groups, router) => {
    const { meta } = router;
    if (meta && meta.tags) {
      const { tags, description, prefix } = meta;
      debug('load docs', tags, description, prefix);
      const group = groups[tags];
      if (group) {
        group.routes = group.routes.concat(router.routes);
      } else {
        groups[tags] = {
          groupName: tags,
          description: description || '',
          routes: router.routes,
          prefix: prefix
        };
      }
    }
    return groups;
  }, {});
};

const createDocs = (routers, version) => {
  return {
    title: 'Gridly Handlers Service',
    version: version,
    theme: 'Cosmo',
    routeHandlers: 'disabled',
    groups: Object.values(groupApi(routers))
  };
};

module.exports = createDocs;
