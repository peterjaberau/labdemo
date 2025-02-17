
/**
 * The read-only set of capabilities available for the current UI session.
 * Capabilities are simple key-value pairs of (string, boolean), where the string denotes the capability ID,
 * and the boolean is a flag indicating if the capability is enabled or disabled.
 *
 * @public
 */
export interface Capabilities {
  /** Navigation link capabilities. */
  navLinks: Record<string, boolean>;

  /** Management section capabilities. */
  management: {
    [sectionId: string]: Record<string, boolean>;
  };

  /** Catalogue capabilities. Catalogue entries drive the visibility of the OpenSearch Dashboards homepage options. */
  catalogue: Record<string, boolean>;

  /** Workspaces capabilities. */
  workspaces: Record<string, boolean>;

  /** Custom capabilities, registered by plugins. undefined if the key does not exist */
  [key: string]: Record<string, boolean | Record<string, boolean>> | undefined;
}
