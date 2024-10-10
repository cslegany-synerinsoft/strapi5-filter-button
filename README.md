# filter-button
> This package provides a custom field for Strapi 5 that lets you add a filter button in no time.

Inspired by the [`request` package](https://github.com/kalpesh442266/Filter-Button).

## Installation

NPM:

> `npm install @cslegany/filter-button-strapi5`

Yarn:

> `yarn add @cslegany/filter-button-strapi5`

## Usage
- Install and configure the plugin. If you have Articles and Categories relations, you can use it to have a 'View Articles' button in the Edit View of a Category.
- If you click on this button, it will show all Articles belonging to that Category using Strapi's Content Manager.
- Multi-to-Multi relations are also supported. Let's say that you have a Labels relation and each Article can have multiple Labels. In that case you have to set Multi-to-Multi in the configuration of this plugin.

## License

MIT
