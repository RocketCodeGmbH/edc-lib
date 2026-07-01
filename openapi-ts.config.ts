import {readdirSync} from 'node:fs';
import {join, relative} from 'node:path';
import {defineConfig, type UserConfig} from '@hey-api/openapi-ts';

const SPEC_ROOT = 'spec';

const plugins: UserConfig['plugins'] = [
  '@hey-api/client-fetch',
  '@hey-api/typescript',
  {
    name: '@hey-api/sdk',
    operations: {
      strategy: 'byTags',
      container: 'class',
      containerName: '{{name}}Service',
      methods: 'instance',
      nesting: 'operationId',
    },
  },
];

function findSpecs(dir: string): string[] {
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return findSpecs(full);
    return /\.ya?ml$/.test(entry.name) ? [full] : [];
  });
}

// One isolated client per spec file. data-plane-signaling-api is excluded:
// it is internal plane-to-plane comms that library consumers never call.
const specs = findSpecs(SPEC_ROOT)
  .filter(p => !p.includes('data-plane-signaling-api'))
  .sort();

export default defineConfig(
  specs.map(specPath => ({
    input: specPath,
    output: join('src', relative(SPEC_ROOT, specPath).replace(/\.ya?ml$/, '')),
    plugins,
  }))
);
