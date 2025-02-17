

/**
 * A type definition for custom branding configurations from yml file
 * @public
 */

export interface Branding {
  /** Default mode or Dark mode*/
  darkMode?: boolean;
  /** Relative path to the asset folder */
  assetFolderUrl?: string;
  /** Small logo icon that will be used in most logo occurrences */
  mark?: {
    defaultUrl?: string;
    darkModeUrl?: string;
  };
  /** Fuller logo that will be rendered on nav bar header */
  logo?: {
    defaultUrl?: string;
    darkModeUrl?: string;
  };
  /** Loading logo that will be rendered on the loading page */
  loadingLogo?: {
    defaultUrl?: string;
    darkModeUrl?: string;
  };
  /** Custom favicon that will be rendered on the browser tab */
  faviconUrl?: string;
  /** Application title that will replace the default opensearch dashboard string */
  applicationTitle?: string;
  /** Whether to use expanded menu (true) or condensed menu (false) */
  useExpandedHeader?: boolean;
}
