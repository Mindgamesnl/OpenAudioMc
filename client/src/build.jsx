import meta from './metadata.json';

export const VERSION = {
  revision: meta.buildRevision,
  major: meta.buildMajor, // DEPRECATED - use meta.revision
  minor: meta.buildMinor, // DEPRECATED - use meta.revision
  tag: meta.buildTag,
  date: meta.buildDate,
  build: meta.build,
  isProd: () => meta.build === 'prod',
  isDev: () => meta.build === 'dev',
};
