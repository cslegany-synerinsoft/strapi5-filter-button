import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'filterButton',
    plugin: 'filter-button',
    type: 'string',
  })
};

export default register;
