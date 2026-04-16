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
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import {CancelablePromise} from '../../core/CancelablePromise.js';
import {OpenAPIConfig} from '../../core/OpenAPI.js';
import {request as __request} from '../../core/request.js';
import {Catalog, CatalogRequestDto} from '../../index.js';

export class CatalogService {
  private OpenAPI: OpenAPIConfig;
  constructor(endpointConfig: OpenAPIConfig) {
    this.OpenAPI = endpointConfig;
  }

  /**
   * @deprecated
   * @param providerUrl
   * @param offset
   * @param limit
   * @param filter
   * @param sort
   * @param sortField
   * @returns Catalog Gets contract offers (=catalog) of a single connector
   * @throws ApiError
   */
  public getCatalog(
    providerUrl: string,
    offset?: number,
    limit?: number,
    filter?: string,
    sort?: 'ASC' | 'DESC',
    sortField?: string
  ): CancelablePromise<Catalog> {
    return __request(this.OpenAPI, {
      method: 'GET',
      url: '/catalog',
      query: {
        providerUrl: providerUrl,
        offset: offset,
        limit: limit,
        filter: filter,
        sort: sort,
        sortField: sortField,
      },
    });
  }

  /**
   * @param requestBody
   * @returns Catalog Gets contract offers (=catalog) of a single connector
   * @throws ApiError
   */
  public requestCatalog(
    requestBody: CatalogRequestDto
  ): CancelablePromise<Catalog> {
    return __request(this.OpenAPI, {
      method: 'POST',
      url: '/v3/catalog/request',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
