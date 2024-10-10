import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

type TradOptions = Record<string, string>;

const prefixPluginTranslations = (
  trad: TradOptions,
  pluginId: string
): TradOptions => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {} as TradOptions);
};

export default {
  register(app: any) {

    app.customFields.register({
      name: "filterButton",
      pluginId: `${PLUGIN_ID}`,
      type: "string", // the selected value will be stored as a string

      intlLabel: {
        id: `${PLUGIN_ID}.plugin.label`,
        defaultMessage: "Filter Button",
      },
      intlDescription: {
        id: `${PLUGIN_ID}.plugin.description`,
        defaultMessage: "Filter Data",
      },
      icon: PluginIcon, // don't forget to create/import your icon component 
      components: {
        Input: async () => {
          const component = await import('./components/ButtonComponent');
          return component;
        },
      },
      options: {
        // declare options here
      },
    });

    app.createSettingSection(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: `${PLUGIN_ID}.plugin.name`,
          defaultMessage: 'Filter Button',
        },
      },
      [
        {
          intlLabel: {
            id: `${PLUGIN_ID}.plugin.configuration`,
            defaultMessage: 'Configuration',
          },
          id: 'settings',
          to: `${PLUGIN_ID}`,
          Component:() => import('./pages/Settings'),
        },
      ]
    );

    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    //   Component: async () => {
    //     const { App } = await import('./pages/App');

    //     return App;
    //   },
    // });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, PLUGIN_ID),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};
