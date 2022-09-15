declare type ThemeType = { light: 'light', dark: 'dark' }

declare type MenuType = { inline: 'inline', horizontal: 'horizontal', mix: 'mix' }

declare type PageStyle = { light: string, dark: string, darkMode: string }

declare type TabsItem = { path: string, name: string, [key: string]: any }

declare type Tabs = { [key: string]: ITabsItem }