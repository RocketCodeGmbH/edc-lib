import {
  createClient as createMgmtClient,
  createConfig as createMgmtConfig,
} from './management-api/asset-api/client/index.js';
import {AssetV3Service} from './management-api/asset-api/index.js';
import {CatalogV3Service} from './management-api/catalog-api/index.js';
import {ContractAgreementV3Service} from './management-api/contract-agreement-api/index.js';
import {ContractDefinitionV3Service} from './management-api/contract-definition-api/index.js';
import {ContractNegotiationV3Service} from './management-api/contract-negotiation-api/index.js';
import {
  createClient as createProvisionClient,
  createConfig as createProvisionConfig,
} from './management-api/data-plane-provision-http/client/index.js';
import {DefaultService as DataPlaneProvisionService} from './management-api/data-plane-provision-http/index.js';
import {DataplaneSelectorV3Service} from './management-api/data-plane-selector-api/index.js';
import {EdrCacheV3Service} from './management-api/edr-cache-api/index.js';
import {PolicyDefinitionV3Service} from './management-api/policy-definition-api/index.js';
import {ProtocolVersionV4AlphaService} from './management-api/protocol-version-api/index.js';
import {HttpProvisionerWebhookService} from './management-api/provision-http/index.js';
import {SecretV3Service} from './management-api/secrets-api/index.js';
import {TransferProcessV3Service} from './management-api/transfer-process-api/index.js';
import {
  createClient as createCtrlClient,
  createConfig as createCtrlConfig,
} from './control-api/control-plane-api/client/index.js';
import {TransferProcessControlApiService} from './control-api/control-plane-api/index.js';
import {DataplaneSelectorService} from './control-api/data-plane-selector-control-api/index.js';
import {
  createClient as createObsClient,
  createConfig as createObsConfig,
} from './observability-api/api-observability/client/index.js';
import {ApplicationObservabilityService} from './observability-api/api-observability/index.js';
import {
  createClient as createPublicClient,
  createConfig as createPublicConfig,
} from './public-api/data-plane-public-api-v2/client/index.js';
import {DataPlanePublicApiService} from './public-api/data-plane-public-api-v2/index.js';
import {
  createClient as createVersionClient,
  createConfig as createVersionConfig,
} from './version-api/version-api/client/index.js';
import {VersionService} from './version-api/version-api/index.js';

export {DataPlaneProvisionService};

export interface EDCConnectorAuth {
  username: string;
  password: string;
}

export interface EDCConnectorOptions {
  controlPlane: {
    /** Management API base URL (port 8181 by default). */
    managementUrl: string;
    /** Control API base URL (port 9191 by default). Defaults to managementUrl. */
    controlUrl?: string;
  };
  dataPlane?: {
    /** Data-plane provisioner callback URL. Defaults to managementUrl. */
    provisionUrl?: string;
    /** Data-plane public API base URL. */
    publicUrl?: string;
  };
  /** Observability / health base URL (port 8080 by default). Defaults to managementUrl. */
  healthUrl?: string;
  auth?: EDCConnectorAuth;
}

export interface EDCControlPlane {
  readonly assetService: AssetV3Service;
  readonly catalogService: CatalogV3Service;
  readonly contractAgreementService: ContractAgreementV3Service;
  readonly contractDefinitionService: ContractDefinitionV3Service;
  readonly contractNegotiationService: ContractNegotiationV3Service;
  readonly dataplaneSelector: DataplaneSelectorV3Service;
  readonly edrCacheService: EdrCacheV3Service;
  readonly httpProvisionerWebhook: HttpProvisionerWebhookService;
  readonly policyService: PolicyDefinitionV3Service;
  readonly protocolVersion: ProtocolVersionV4AlphaService;
  readonly secretService: SecretV3Service;
  readonly transferProcessService: TransferProcessV3Service;
  readonly transferProcessControl: TransferProcessControlApiService;
  readonly controlDataplaneSelector: DataplaneSelectorService;
}

export interface EDCDataPlane {
  /** data-plane-provision-http — provisioner webhook callbacks */
  readonly provision: DataPlaneProvisionService;
  readonly public: DataPlanePublicApiService;
}

function basicAuth(auth?: EDCConnectorAuth): Record<string, string> {
  if (!auth) return {};
  return {Authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`};
}

export class EDCConnector {
  readonly controlPlane: EDCControlPlane;
  readonly dataPlane: EDCDataPlane;
  readonly observabilityService: ApplicationObservabilityService;
  readonly versionService: VersionService;

  constructor(options: EDCConnectorOptions) {
    const {controlPlane: cp, dataPlane: dp, healthUrl, auth} = options;
    const headers = basicAuth(auth);

    const mgmtClient = createMgmtClient(
      createMgmtConfig({baseUrl: cp.managementUrl, headers})
    );
    const ctrlClient = createCtrlClient(
      createCtrlConfig({baseUrl: cp.controlUrl ?? cp.managementUrl, headers})
    );
    const obsClient = createObsClient(
      createObsConfig({baseUrl: healthUrl ?? cp.managementUrl, headers})
    );
    const publicClient = createPublicClient(
      createPublicConfig({baseUrl: dp?.publicUrl ?? cp.managementUrl, headers})
    );
    const versionClient = createVersionClient(
      createVersionConfig({baseUrl: healthUrl ?? cp.managementUrl, headers})
    );
    const provisionClient = createProvisionClient(
      createProvisionConfig({baseUrl: dp?.provisionUrl ?? cp.managementUrl, headers})
    );

    this.controlPlane = {
      assetService: new AssetV3Service({client: mgmtClient}),
      catalogService: new CatalogV3Service({client: mgmtClient}),
      contractAgreementService: new ContractAgreementV3Service({client: mgmtClient}),
      contractDefinitionService: new ContractDefinitionV3Service({client: mgmtClient}),
      contractNegotiationService: new ContractNegotiationV3Service({client: mgmtClient}),
      dataplaneSelector: new DataplaneSelectorV3Service({client: mgmtClient}),
      edrCacheService: new EdrCacheV3Service({client: mgmtClient}),
      httpProvisionerWebhook: new HttpProvisionerWebhookService({client: mgmtClient}),
      policyService: new PolicyDefinitionV3Service({client: mgmtClient}),
      protocolVersion: new ProtocolVersionV4AlphaService({client: mgmtClient}),
      secretService: new SecretV3Service({client: mgmtClient}),
      transferProcessService: new TransferProcessV3Service({client: mgmtClient}),
      transferProcessControl: new TransferProcessControlApiService({client: ctrlClient}),
      controlDataplaneSelector: new DataplaneSelectorService({client: ctrlClient}),
    };

    this.dataPlane = {
      provision: new DataPlaneProvisionService({client: provisionClient}),
      public: new DataPlanePublicApiService({client: publicClient}),
    };

    this.observabilityService = new ApplicationObservabilityService({client: obsClient});
    this.versionService = new VersionService({client: versionClient});
  }
}
