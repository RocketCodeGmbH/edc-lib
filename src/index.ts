/*
 * Copyright 2023 Fraunhofer IEE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *       Michel Otto - initial implementation
 *
 */
import {OpenAPIConfig} from './core/OpenAPI.js';
import {ConsumerPullTokenValidationService} from './services/control/ConsumerPullTokenValidationService.js';
import {DataPlaneControlApiService} from './services/control/DataPlaneControlApiService.js';
import {DataPlanePublicApiService} from './services/control/DataPlanePublicApiService.js';
import {TransferProcessControlApiService} from './services/control/TransferProcessControlApiService.js';
import {ApplicationObservabilityService} from './services/management/ApplicationObservabilityService.js';
import {AssetService} from './services/management/AssetService.js';
import {CatalogService} from './services/management/CatalogService.js';
import {ContractAgreementService} from './services/management/ContractAgreementService.js';
import {ContractDefinitionService} from './services/management/ContractDefinitionService.js';
import {ContractNegotiationService} from './services/management/ContractNegotiationService.js';
import {DataplaneSelectorService} from './services/management/DataplaneSelectorService.js';
import {HttpProvisionerWebhookService} from './services/management/HttpProvisionerWebhookService.js';
import {PolicyService} from './services/management/PolicyService.js';
import {TransferProcessService} from './services/management/TransferProcessService.js';

export {ApiError} from './core/ApiError.js';
export {CancelablePromise, CancelError} from './core/CancelablePromise.js';
export type {OpenAPIConfig} from './core/OpenAPI.js';

export type {ApiErrorDetail} from './models/ApiErrorDetail.js';
export type {DataAddress} from './models/DataAddress.js';
export type {DataFlowRequest} from './models/control/DataFlowRequest.js';
export type {TransferProcessFailStateDto} from './models/control/TransferProcessFailStateDto.js';

export type {Action} from './models/management/Action.js';
export type {Asset} from './models/management/Asset.js';
export type {AssetEntryDto} from './models/management/AssetEntryDto.js';
export type {AssetRequestDto} from './models/management/AssetRequestDto.js';
export type {AssetResponseDto} from './models/management/AssetResponseDto.js';
export type {Catalog} from './models/management/Catalog.js';
export type {CatalogRequestDto} from './models/management/CatalogRequestDto.js';
export type {Constraint} from './models/management/Constraint.js';
export type {ContractAgreementDto} from './models/management/ContractAgreementDto.js';
export type {ContractDefinitionRequestDto} from './models/management/ContractDefinitionRequestDto.js';
export type {ContractDefinitionResponseDto} from './models/management/ContractDefinitionResponseDto.js';
export {ContractNegotiationDto} from './models/management/ContractNegotiationDto.js';
export type {ContractOffer} from './models/management/ContractOffer.js';
export type {ContractOfferDescription} from './models/management/ContractOfferDescription.js';
export type {CriterionDto} from './models/management/CriterionDto.js';
export type {DataAddressDto} from './models/management/DataAddressDto.js';
export type {DataAddressInformationDto} from './models/management/DataAddressInformationDto.js';
export type {DataPlaneInstance} from './models/management/DataPlaneInstance.js';
export type {DataRequestDto} from './models/management/DataRequestDto.js';
export type {DeprovisionedResource} from './models/management/DeprovisionedResource.js';
export type {Duty} from './models/management/Duty.js';
export type {Failure} from './models/management/Failure.js';
export type {HealthCheckResult} from './models/management/HealthCheckResult.js';
export type {HealthStatus} from './models/management/HealthStatus.js';
export type {IdResponseDto} from './models/management/IdResponseDto.js';
export type {NegotiationInitiateRequestDto} from './models/management/NegotiationInitiateRequestDto.js';
export type {NegotiationState} from './models/management/NegotiationState.js';
export type {Permission} from './models/management/Permission.js';
export {Policy} from './models/management/Policy.js';
export type {PolicyDefinitionRequestDto} from './models/management/PolicyDefinitionRequestDto.js';
export type {PolicyDefinitionResponseDto} from './models/management/PolicyDefinitionResponseDto.js';
export type {Prohibition} from './models/management/Prohibition.js';
export type {ProvisionerWebhookRequest} from './models/management/ProvisionerWebhookRequest.js';
export {QuerySpecDto} from './models/management/QuerySpecDto.js';
export type {SelectionRequest} from './models/management/SelectionRequest.js';
export type {TransferProcessDto} from './models/management/TransferProcessDto.js';
export type {TransferRequestDto} from './models/management/TransferRequestDto.js';
export type {TransferState} from './models/management/TransferState.js';
export type {TransferType} from './models/management/TransferType.js';

export {ConsumerPullTokenValidationService} from './services/control/ConsumerPullTokenValidationService.js';
export {DataPlaneControlApiService} from './services/control/DataPlaneControlApiService.js';
export {DataPlanePublicApiService} from './services/control/DataPlanePublicApiService.js';
export {TransferProcessControlApiService} from './services/control/TransferProcessControlApiService.js';

export {ApplicationObservabilityService} from './services/management/ApplicationObservabilityService.js';
export {AssetService} from './services/management/AssetService.js';
export {CatalogService} from './services/management/CatalogService.js';
export {ContractAgreementService} from './services/management/ContractAgreementService.js';
export {ContractDefinitionService} from './services/management/ContractDefinitionService.js';
export {ContractNegotiationService} from './services/management/ContractNegotiationService.js';
export {DataplaneSelectorService} from './services/management/DataplaneSelectorService.js';
export {HttpProvisionerWebhookService} from './services/management/HttpProvisionerWebhookService.js';
export {PolicyService} from './services/management/PolicyService.js';
export {TransferProcessService} from './services/management/TransferProcessService.js';

export class EDCConnector {
  consumerPullTokenValidationService: ConsumerPullTokenValidationService;
  dataPlaneControlApiService: DataPlaneControlApiService;
  dataPlanePublicApiService: DataPlanePublicApiService;
  transferProcessControlApiService: TransferProcessControlApiService;

  applicationObservabilityService: ApplicationObservabilityService;
  assetService: AssetService;
  catalogService: CatalogService;
  contractAgreementService: ContractAgreementService;
  contractDefinitionService: ContractDefinitionService;
  contractNegotiationService: ContractNegotiationService;
  dataplaneSelectorService: DataplaneSelectorService;
  httpProvisionerWebhookService: HttpProvisionerWebhookService;
  policyService: PolicyService;
  transferProcessService: TransferProcessService;

  constructor(
    controlApiEndpointUrl: string,
    managementApiEndpointUrl: string,
    username: string,
    password: string
  ) {
    // data plane control api config
    const controlEndpointConfig: OpenAPIConfig = {
      BASE: controlApiEndpointUrl,
      VERSION: '7.1.0',
      WITH_CREDENTIALS: true,
      CREDENTIALS: 'include',
      TOKEN: undefined,
      USERNAME: username,
      PASSWORD: password,
      HEADERS: undefined,
      ENCODE_PATH: undefined,
    };

    // management api config — EDC 0.16.0 uses X-Api-Key header (edc.api.auth.key)
    const managementEndpointConfig: OpenAPIConfig = {
      BASE: managementApiEndpointUrl,
      VERSION: '7.1.0',
      WITH_CREDENTIALS: false,
      CREDENTIALS: 'include',
      TOKEN: undefined,
      USERNAME: undefined,
      PASSWORD: undefined,
      HEADERS: {'X-Api-Key': password},
      ENCODE_PATH: undefined,
    };

    this.consumerPullTokenValidationService =
      new ConsumerPullTokenValidationService(controlEndpointConfig);
    this.dataPlaneControlApiService = new DataPlaneControlApiService(
      controlEndpointConfig
    );
    this.dataPlanePublicApiService = new DataPlanePublicApiService(
      controlEndpointConfig
    );
    this.transferProcessControlApiService =
      new TransferProcessControlApiService(controlEndpointConfig);

    this.applicationObservabilityService = new ApplicationObservabilityService(
      managementEndpointConfig
    );
    this.assetService = new AssetService(managementEndpointConfig);
    this.catalogService = new CatalogService(managementEndpointConfig);
    this.contractAgreementService = new ContractAgreementService(
      managementEndpointConfig
    );
    this.contractDefinitionService = new ContractDefinitionService(
      managementEndpointConfig
    );
    this.contractNegotiationService = new ContractNegotiationService(
      managementEndpointConfig
    );
    this.dataplaneSelectorService = new DataplaneSelectorService(
      managementEndpointConfig
    );
    this.httpProvisionerWebhookService = new HttpProvisionerWebhookService(
      managementEndpointConfig
    );
    this.policyService = new PolicyService(managementEndpointConfig);
    this.transferProcessService = new TransferProcessService(
      managementEndpointConfig
    );
  }
}
