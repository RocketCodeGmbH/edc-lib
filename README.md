# edc-lib

edc-lib is a JavaScript/TypeScript library to control / interact with the [Eclipse Dataspace Connector](https://github.com/eclipse-edc/Connector).

The library is written in TypeScript and can be used from either JavaScript or TypeScript. It targets EDC **0.14.1** and is generated per API from the connector's official OpenAPI specs. It is intended for server-side use (Node >= 18) and relies on the runtime's built-in `fetch` — it has no runtime dependencies.

## Installation

```bash
npm i edc-lib
```

## Usage

A single `EDCConnector` bundles the connector's APIs. Configure it with the connector's base URLs and, optionally, credentials — either basic auth (`{username, password}`) or an API key (`{apiKey, apiKeyHeader?}`, header defaults to `X-Api-Key`). Then call the per-API services.

```typescript
import {EDCConnector} from 'edc-lib';

const connector = new EDCConnector({
  controlPlane: {
    managementUrl: 'https://localhost:8181/management',
    controlUrl: 'https://localhost:9191/control', // optional, defaults to managementUrl
  },
  auth: {apiKey: 'my-api-key'},
});

// Register an asset on the management API
const {data: asset} = await connector.controlPlane.assetService.createAssetV3({
  body: {
    '@context': {'@vocab': 'https://w3id.org/edc/v0.0.1/ns/'},
    '@id': 'asset-1',
    properties: {name: 'My dataset'},
    dataAddress: {type: 'HttpData', baseUrl: 'https://example.com/data'},
  },
});

// Request a remote connector's catalog
const {data: catalog} = await connector.controlPlane.catalogService.requestCatalogV3({
  body: {
    '@context': {'@vocab': 'https://w3id.org/edc/v0.0.1/ns/'},
    counterPartyAddress: 'https://provider:8282/protocol',
    protocol: 'dataspace-protocol-http',
  },
});

// Check the connector's health
const {data: health} = await connector.observabilityService.checkHealth();
```

The service groups are `connector.controlPlane` (assets, catalog, contract definitions / negotiations / agreements, policies, transfer processes, EDR cache, secrets, data-plane selector, …), `connector.dataPlane` (provision and public data-plane APIs), `connector.observabilityService`, and `connector.versionService`.

## Regenerating the client

The models and services are generated from the EDC OpenAPI specs with [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts). The emitted `*.gen.ts` files are not hand-edited — change the generator configuration and regenerate instead.

```bash
npm run generate   # regenerate the client from the specs
npm run build      # generate + compile to build/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)
