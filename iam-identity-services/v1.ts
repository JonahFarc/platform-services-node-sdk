/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IAM Identity Service API allows for the management of Identities (Service IDs, ApiKeys).
 */

class IamIdentityServicesV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://iam.test.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'iam_identity_services';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IamIdentityServicesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {IamIdentityServicesV1}
   */

  public static newInstance(options: UserOptions): IamIdentityServicesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IamIdentityServicesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a IamIdentityServicesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IamIdentityServicesV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IamIdentityServicesV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * identityOperations
   ************************/

  /**
   * Get API keys for a given a service or user IAM ID and account ID.
   *
   * Returns the list of API key details for a given service or user IAM ID and account ID. Users can manage user API
   * keys for themself, or service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} [params.iamId] - IAM ID of the API key(s) to be queried. The IAM ID may be that of a user or a
   * service. For a user IAM ID iam_id must match the Authorization token.
   * @param {string} [params.pagesize] - Optional size of a single page. Default is 20 items per page. Valid range is 1
   * to 100.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ListApiKeysResponse>>}
   */
  public listApiKeys(params?: IamIdentityServicesV1.ListApiKeysParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ListApiKeysResponse>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'account_id': _params.accountId,
        'iam_id': _params.iamId,
        'pagesize': _params.pagesize,
        'pagetoken': _params.pagetoken
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'listApiKeys');

      const parameters = {
        options: {
          url: '/v1/apikeys',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Create an ApiKey.
   *
   * Creates an API key for a UserID or service ID. Users can manage user API keys for themself, or service ID API keys
   * for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Name of the API key. The name is not checked for uniqueness. Therefore multiple names
   * with the same value can exist. Access is done via the UUID of the API key.
   * @param {string} params.iamId - The iam_id that this API key authenticates.
   * @param {string} [params.description] - The optional description of the API key. The 'description' property is only
   * available if a description was provided during a create of an API key.
   * @param {string} [params.accountId] - The account ID of the API key.
   * @param {string} [params.apikey] - You can optionally passthrough the API key value for this API key. If passed, NO
   * validation of that apiKey value is done, i.e. the value can be non-URL safe. If omitted, the API key management
   * will create an URL safe opaque API key value. The value of the API key is checked for uniqueness. Please ensure
   * enough variations when passing in this value.
   * @param {string} [params.entityLock] - Indicates if the API key is locked for further write operations. False by
   * default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>>}
   */
  public createApiKey(params: IamIdentityServicesV1.CreateApiKeyParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['name', 'iamId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'iam_id': _params.iamId,
        'description': _params.description,
        'account_id': _params.accountId,
        'apikey': _params.apikey
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'createApiKey');

      const parameters = {
        options: {
          url: '/v1/apikeys',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Entity-Lock': _params.entityLock
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Get details of an API key by its value.
   *
   * Returns the details of an API key by its value. Users can manage user API keys for themself, or service ID API keys
   * for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.iamApiKey] - API key value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>>}
   */
  public getApiKeyDetails(params?: IamIdentityServicesV1.GetApiKeyDetailsParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'getApiKeyDetails');

      const parameters = {
        options: {
          url: '/v1/apikeys/details',
          method: 'GET',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'IAM-ApiKey': _params.iamApiKey
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Get details of an API key.
   *
   * Returns the details of an API key. Users can manage user API keys for themself, or service ID API keys for service
   * IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>>}
   */
  public getApiKey(params: IamIdentityServicesV1.GetApiKeyParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'getApiKey');

      const parameters = {
        options: {
          url: '/v1/apikeys/{id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Updates an ApiKey.
   *
   * Updates properties of an API key. This does NOT affect existing access tokens. Their token content will stay
   * unchanged until the access token is refreshed. To update an API key, pass the property to be modified. To delete
   * one property's value, pass the property with an empty value "".Users can manage user API keys for themself, or
   * service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key to be updated.
   * @param {string} params.ifMatch - Version of the API key to be updated. Specify the version that you retrieved when
   * reading the API key. This value  helps identifying parallel usage of this API. Pass * to indicate to update any
   * version available. This might result in stale updates.
   * @param {string} [params.name] - The name of the API key to update. If specified in the request the parameter must
   * not be empty. The name is not checked for uniqueness. Failure to this will result in an Error condition.
   * @param {string} [params.description] - The description of the API key to update. If specified an empty description
   * will clear the description of the API key. If a non empty value is provided the API key will be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>>}
   */
  public updateApiKey(params: IamIdentityServicesV1.UpdateApiKeyParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ApiKeyDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['id', 'ifMatch'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description
      };

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateApiKey');

      const parameters = {
        options: {
          url: '/v1/apikeys/{id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Deletes an ApiKey.
   *
   * Deletes an API key. Existing tokens will remain valid until expired. Refresh tokens will not work any more for this
   * API key. Users can manage user API keys for themself, or service ID API keys for service IDs that are bound to an
   * entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>>}
   */
  public deleteApiKey(params: IamIdentityServicesV1.DeleteApiKeyParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteApiKey');

      const parameters = {
        options: {
          url: '/v1/apikeys/{id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Lock the API key.
   *
   * Locks an API key by ID. Users can manage user API keys for themself, or service ID API keys for service IDs that
   * are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>>}
   */
  public lockApiKey(params: IamIdentityServicesV1.LockApiKeyParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'lockApiKey');

      const parameters = {
        options: {
          url: '/v1/apikeys/{id}/lock',
          method: 'POST',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Unlock the API key.
   *
   * Unlocks an API key by ID. Users can manage user API keys for themself, or service ID API keys for service IDs that
   * are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>>}
   */
  public unlockApiKey(params: IamIdentityServicesV1.UnlockApiKeyParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'unlockApiKey');

      const parameters = {
        options: {
          url: '/v1/apikeys/{id}/lock',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * List service IDs.
   *
   * Returns a list of service IDs. Users can manage user API keys for themself, or service ID API keys for service IDs
   * that are bound to an entity they have access to.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the service ID(s) to query. This parameter is required (unless
   * using a pagetoken).
   * @param {string} [params.name] - Name of the service ID(s) to query. Optional.20 items per page.
   * @param {string} [params.pagesize] - Optional size of a single page. Default is 20 items per page. Valid range is 1
   * to 100.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - Optional sort property, valid values are name, description, createdAt and
   * modifiedAt. If specified, the items are sorted by the value of this property.
   * @param {string} [params.order] - Optional sort order, valid values are asc and desc. Default: asc.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdsList>>}
   */
  public listServiceIds(params?: IamIdentityServicesV1.ListServiceIdsParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdsList>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'account_id': _params.accountId,
        'name': _params.name,
        'pagesize': _params.pagesize,
        'pagetoken': _params.pagetoken,
        'sort': _params.sort,
        'order': _params.order
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'listServiceIds');

      const parameters = {
        options: {
          url: '/v1/serviceids',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Create a service ID.
   *
   * Creates a service ID for an IBM Cloud account. Users can manage user API keys for themself, or service ID API keys
   * for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account the service ID belongs to.
   * @param {string} params.name - Name of the service ID. The name is not checked for uniqueness. Therefore multiple
   * names with the same value can exist. Access is done via the UUID of the Service Id.
   * @param {string} [params.description] - The optional description of the Service Id. The 'description' property is
   * only available if a description was provided during a create of a ServiceId.
   * @param {string[]} [params.uniqueInstanceCrns] - Optional list of CRNs (string array) which point to the services
   * connected to the service ID.
   * @param {CreateApiKeyRequest} [params.apikey] - Input body parameters for the Create API key V1 REST request.
   * @param {string} [params.entityLock] - Indicates if the service ID is locked for further write operations. False by
   * default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>>}
   */
  public createServiceId(params: IamIdentityServicesV1.CreateServiceIdParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'name'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'account_id': _params.accountId,
        'name': _params.name,
        'description': _params.description,
        'unique_instance_crns': _params.uniqueInstanceCrns,
        'apikey': _params.apikey
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'createServiceId');

      const parameters = {
        options: {
          url: '/v1/serviceids',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Entity-Lock': _params.entityLock
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Get details of a service ID.
   *
   * Returns the details of a service ID. Users can manage user API keys for themself, or service ID API keys for
   * service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>>}
   */
  public getServiceId(params: IamIdentityServicesV1.GetServiceIdParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'getServiceId');

      const parameters = {
        options: {
          url: '/v1/serviceids/{id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Update service ID.
   *
   * Updates properties of a service ID. This does NOT affect existing access tokens. Their token content will stay
   * unchanged until the access token is refreshed. To update a service ID, pass the property to be modified. To delete
   * one property's value, pass the property with an empty value "".Users can manage user API keys for themself, or
   * service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID to be updated.
   * @param {string} params.ifMatch - Version of the service ID to be updated. Specify the version that you retrieved as
   * entity_tag (ETag header) when reading the service ID. This value helps identifying parallel usage of this API. Pass
   * * to indicate to update any version available. This might result in stale updates.
   * @param {string} [params.name] - The name of the service ID to update. If specified in the request the parameter
   * must not be empty. The name is not checked for uniqueness. Failure to this will result in an Error condition.
   * @param {string} [params.description] - The description of the service ID to update. If specified an empty
   * description will clear the description of the service ID. If an non empty value is provided the service ID will be
   * updated.
   * @param {string[]} [params.uniqueInstanceCrns] - List of CRNs which point to the services connected to this service
   * ID. If specified an empty list will clear all existing unique instance crns of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>>}
   */
  public updateServiceId(params: IamIdentityServicesV1.UpdateServiceIdParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['id', 'ifMatch'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'unique_instance_crns': _params.uniqueInstanceCrns
      };

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateServiceId');

      const parameters = {
        options: {
          url: '/v1/serviceids/{id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Deletes a service ID and associated API keys.
   *
   * Deletes a service ID and all API keys associated to it. Before deleting the service ID, all associated API keys are
   * deleted. In case a Delete Conflict (status code 409) a retry of the request may help as the service ID is only
   * deleted if the associated API keys were successfully deleted before. Users can manage user API keys for themself,
   * or service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>>}
   */
  public deleteServiceId(params: IamIdentityServicesV1.DeleteServiceIdParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteServiceId');

      const parameters = {
        options: {
          url: '/v1/serviceids/{id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Lock the service ID.
   *
   * Locks a service ID by ID. Users can manage user API keys for themself, or service ID API keys for service IDs that
   * are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>>}
   */
  public lockServiceId(params: IamIdentityServicesV1.LockServiceIdParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'lockServiceId');

      const parameters = {
        options: {
          url: '/v1/serviceids/{id}/lock',
          method: 'POST',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Unlock the service ID.
   *
   * Unlocks a service ID by ID. Users can manage user API keys for themself, or service ID API keys for service IDs
   * that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>>}
   */
  public unlockServiceId(params: IamIdentityServicesV1.UnlockServiceIdParams): Promise<IamIdentityServicesV1.Response<IamIdentityServicesV1.ServiceIdDetails>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IamIdentityServicesV1.DEFAULT_SERVICE_NAME, 'v1', 'unlockServiceId');

      const parameters = {
        options: {
          url: '/v1/serviceids/{id}/lock',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace IamIdentityServicesV1 {

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listApiKeys` operation. */
  export interface ListApiKeysParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId?: string;
    /** IAM ID of the API key(s) to be queried. The IAM ID may be that of a user or a service. For a user IAM ID
     *  iam_id must match the Authorization token.
     */
    iamId?: string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    pagesize?: string;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createApiKey` operation. */
  export interface CreateApiKeyParams {
    /** Name of the API key. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the API key.
     */
    name: string;
    /** The iam_id that this API key authenticates. */
    iamId: string;
    /** The optional description of the API key. The 'description' property is only available if a description was
     *  provided during a create of an API key.
     */
    description?: string;
    /** The account ID of the API key. */
    accountId?: string;
    /** You can optionally passthrough the API key value for this API key. If passed, NO validation of that apiKey
     *  value is done, i.e. the value can be non-URL safe. If omitted, the API key management will create an URL safe
     *  opaque API key value. The value of the API key is checked for uniqueness. Please ensure enough variations when
     *  passing in this value.
     */
    apikey?: string;
    /** Indicates if the API key is locked for further write operations. False by default. */
    entityLock?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getApiKeyDetails` operation. */
  export interface GetApiKeyDetailsParams {
    /** API key value. */
    iamApiKey?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getApiKey` operation. */
  export interface GetApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateApiKey` operation. */
  export interface UpdateApiKeyParams {
    /** Unique ID of the API key to be updated. */
    id: string;
    /** Version of the API key to be updated. Specify the version that you retrieved when reading the API key. This
     *  value  helps identifying parallel usage of this API. Pass * to indicate to update any version available. This
     *  might result in stale updates.
     */
    ifMatch: string;
    /** The name of the API key to update. If specified in the request the parameter must not be empty. The name is
     *  not checked for uniqueness. Failure to this will result in an Error condition.
     */
    name?: string;
    /** The description of the API key to update. If specified an empty description will clear the description of
     *  the API key. If a non empty value is provided the API key will be updated.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteApiKey` operation. */
  export interface DeleteApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `lockApiKey` operation. */
  export interface LockApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unlockApiKey` operation. */
  export interface UnlockApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listServiceIds` operation. */
  export interface ListServiceIdsParams {
    /** Account ID of the service ID(s) to query. This parameter is required (unless using a pagetoken). */
    accountId?: string;
    /** Name of the service ID(s) to query. Optional.20 items per page. */
    name?: string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    pagesize?: string;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional sort property, valid values are name, description, createdAt and modifiedAt. If specified, the
     *  items are sorted by the value of this property.
     */
    sort?: string;
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    order?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createServiceId` operation. */
  export interface CreateServiceIdParams {
    /** ID of the account the service ID belongs to. */
    accountId: string;
    /** Name of the service ID. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the Service Id.
     */
    name: string;
    /** The optional description of the Service Id. The 'description' property is only available if a description
     *  was provided during a create of a ServiceId.
     */
    description?: string;
    /** Optional list of CRNs (string array) which point to the services connected to the service ID. */
    uniqueInstanceCrns?: string[];
    /** Input body parameters for the Create API key V1 REST request. */
    apikey?: CreateApiKeyRequest;
    /** Indicates if the service ID is locked for further write operations. False by default. */
    entityLock?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getServiceId` operation. */
  export interface GetServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateServiceId` operation. */
  export interface UpdateServiceIdParams {
    /** Unique ID of the service ID to be updated. */
    id: string;
    /** Version of the service ID to be updated. Specify the version that you retrieved as entity_tag (ETag header)
     *  when reading the service ID. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The name of the service ID to update. If specified in the request the parameter must not be empty. The name
     *  is not checked for uniqueness. Failure to this will result in an Error condition.
     */
    name?: string;
    /** The description of the service ID to update. If specified an empty description will clear the description of
     *  the service ID. If an non empty value is provided the service ID will be updated.
     */
    description?: string;
    /** List of CRNs which point to the services connected to this service ID. If specified an empty list will clear
     *  all existing unique instance crns of the service ID.
     */
    uniqueInstanceCrns?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteServiceId` operation. */
  export interface DeleteServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `lockServiceId` operation. */
  export interface LockServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unlockServiceId` operation. */
  export interface UnlockServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Response body format for API key V1 REST requests. */
  export interface ApiKeyDetails {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Unique identifier of this API Key. */
    id: string;
    /** Version of the API Key details object. You need to specify this value when updating the API key to avoid
     *  stale updates.
     */
    entity_tag?: string;
    /** Cloud Resource Name of the item. Example Cloud Resource Name:
     *  'crn:v1:bluemix:public:iam-identity:us-south:a/myaccount::apikey:1234-9012-5678'.
     */
    crn: string;
    /** The API key cannot be changed if set to true. */
    locked: boolean;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at?: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at?: string;
    /** Name of the API key. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the API key.
     */
    name: string;
    /** The optional description of the API key. The 'description' property is only available if a description was
     *  provided during a create of an API key.
     */
    description?: string;
    /** The iam_id that this API key authenticates. */
    iam_id: string;
    /** ID of the account that this API key authenticates for. */
    account_id: string;
    /** The API key value. For API keys representing a user, this is only returned in the response to the create API
     *  key request.
     */
    apikey: string;
  }

  /** Input body parameters for the Create API key V1 REST request. */
  export interface CreateApiKeyRequest {
    /** Name of the API key. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the API key.
     */
    name: string;
    /** The optional description of the API key. The 'description' property is only available if a description was
     *  provided during a create of an API key.
     */
    description?: string;
    /** The iam_id that this API key authenticates. */
    iam_id: string;
    /** The account ID of the API key. */
    account_id?: string;
    /** You can optionally passthrough the API key value for this API key. If passed, NO validation of that apiKey
     *  value is done, i.e. the value can be non-URL safe. If omitted, the API key management will create an URL safe
     *  opaque API key value. The value of the API key is checked for uniqueness. Please ensure enough variations when
     *  passing in this value.
     */
    apikey?: string;
  }

  /** Context fill with key properties for problem determination. */
  export interface ExceptionResponseContext {
    /** The request ID of the inbound REST request. */
    request_id?: string;
    /** The request type of the inbound REST request. */
    request_type?: string;
    /** The user agent of the inbound REST request. */
    user_agent?: string;
    /** The client ip address of the inbound REST request. */
    client_ip?: string;
    /** The URL of that cluster. */
    url?: string;
    /** The instance ID of the server instance processing the request. */
    instance_id?: string;
    /** The thread ID of the server instance processing the request. */
    thread_id?: string;
    /** The host of the server instance processing the request. */
    host?: string;
    /** The start time of the request. */
    start_time?: string;
    /** The finish time of the request. */
    end_time?: string;
    /** The elapsed time in msec. */
    elapsed_time?: string;
    /** The language used to present the error message. */
    locale?: string;
    /** The cluster name. */
    cluster_name?: string;
  }

  /** Response body format for the List API keys V1 REST request. */
  export interface ListApiKeysResponse {
    /** Context fill with key properties for problem determination. */
    context?: ExceptionResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of API keys based on the query paramters and the page size. The apikeys array is always part of the
     *  response but might be empty depending on the query parameters values provided.
     */
    apikeys: ApiKeyDetails[];
  }

  /** Context with key properties for problem determination. */
  export interface ResponseContext {
    /** The transaction ID of the inbound REST request. */
    transaction_id?: string;
    /** The operation of the inbound REST request. */
    operation?: string;
    /** The user agent of the inbound REST request. */
    user_agent?: string;
    /** The client ip address of the inbound REST request. */
    client_ip?: string;
    /** The URL of that cluster. */
    url?: string;
    /** The instance ID of the server instance processing the request. */
    instance_id?: string;
    /** The thread ID of the server instance processing the request. */
    thread_id?: string;
    /** The host of the server instance processing the request. */
    host?: string;
    /** The start time of the request. */
    start_time?: string;
    /** The finish time of the request. */
    end_time?: string;
    /** The elapsed time in msec. */
    elapsed_time?: string;
    /** The cluster name. */
    cluster_name?: string;
  }

  /** Response body format for service ID V1 REST requests. */
  export interface ServiceIdDetails {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Unique identifier of this Service ID. */
    id: string;
    /** Cloud wide identifier for identities of this service ID. */
    iam_id: string;
    /** Version of the service ID details object. You need to specify this value when updating the service ID to
     *  avoid stale updates.
     */
    entity_tag?: string;
    /** Cloud Resource Name of the item. Example Cloud Resource Name:
     *  'crn:v1:bluemix:public:iam-identity:us-south:a/myaccount::serviceid:1234-5678-9012'.
     */
    crn: string;
    /** The service ID cannot be changed if set to true. */
    locked: boolean;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at?: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at?: string;
    /** ID of the account the service ID belongs to. */
    account_id: string;
    /** Name of the service ID. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the service ID.
     */
    name: string;
    /** The optional description of the service ID. The 'description' property is only available if a description
     *  was provided during a create of a service ID.
     */
    description?: string;
    /** Optional list of CRNs (string array) which point to the services connected to the service ID. */
    unique_instance_crns?: string[];
    /** Response body format for API key V1 REST requests. */
    apikey: ApiKeyDetails;
  }

  /** Response body format for the list service ID V1 REST request. */
  export interface ServiceIdsList {
    /** Context fill with key properties for problem determination. */
    context?: ExceptionResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of service IDs based on the query paramters and the page size. The service IDs array is always part of
     *  the response but might be empty depending on the query parameter values provided.
     */
    serviceids: ServiceIdDetails[];
  }

}

export = IamIdentityServicesV1;
