export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
}

/**
 * from: 'api::category.category', // collection where button will be added
   to: 'api::article.article', // which collection you want to filter
   sortOrder: SortOrder.ASC,
   sortby: 'title', // field name of relation FROM by which you want to filter
   filterBy: 'name', // field name of relation TO by which you want to filter
   customFieldName: 'viewArticles', //attribute name added while adding Custom Field
   buttonTitle: 'View Articles', // title of button,
   manyToMany: false,
 */
export interface PluginSettingsBody {
    from: string;
    to: string;
    sortOrder: SortOrder;
    sortBy: string;
    filterBy: string;
    customFieldName: string;
    buttonTitle: string;
    manyToMany: boolean;
}

export interface PluginSettingsResponse {
    body: Array<PluginSettingsBody>;
}