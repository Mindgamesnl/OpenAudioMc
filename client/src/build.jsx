import meta from './metadata.json';

export const VERSION = {
  revision: meta.buildRevision,
  major: meta.buildMajor,
  minor: meta.buildMinor,
  tag: meta.buildTag,
  date: meta.buildDate,
  build: meta.build,
  isProd: () => meta.build === 'prod',
  isDev: () => meta.build === 'dev',
};
