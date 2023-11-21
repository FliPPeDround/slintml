import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/index.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  onSuccess: 'npm run build:fix',
}
