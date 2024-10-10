import type { Core } from '@strapi/strapi';
import { PluginSettingsBody, PluginSettingsResponse, SortOrder } from '../../../typings';

const getPluginStore = () => {
    return strapi.store({
        environment: '',
        type: 'plugin',
        name: 'filter-button',
    });
};

const createDefaultConfig = async () => {
    const pluginStore = getPluginStore();

    const settingsList: Array<PluginSettingsBody> = [
        {
            from: 'api::category.category',
            to: 'api::article.article',
            sortOrder: SortOrder.ASC,
            sortBy: 'createdAt',
            filterBy: 'name',
            customFieldName: 'viewArticles',
            buttonTitle: 'View Articles',
            manyToMany: false,
        },
        {
            from: 'api::label.label',
            to: 'api::article.article',
            sortOrder: SortOrder.ASC,
            sortBy: 'createdAt',
            filterBy: 'name',
            customFieldName: 'viewArticles',
            buttonTitle: 'View Articles',
            manyToMany: true,
        }
    ];
    const value: PluginSettingsResponse = {
        body: settingsList
    };
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
};

export default ({ strapi }: { strapi: Core.Strapi }) => ({

    async getSettings() {
        const pluginStore = getPluginStore();
        let config = await pluginStore.get({ key: 'settings' });
        if (!config) {
            config = await createDefaultConfig();
        }
        return config;
    },

    async setSettings(settings) {
        const value = settings;
        const pluginStore = getPluginStore();

        await pluginStore.set({ key: 'settings', value });
        return pluginStore.get({ key: 'settings' });
    },

});