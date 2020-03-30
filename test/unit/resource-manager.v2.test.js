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
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const ResourceManagerV2 = require('../../dist/resource-manager/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://resource-controller.test.cloud.ibm.com/v2',
};

const resourceManager = new ResourceManagerV2(service);

// dont actually create a request
const createRequestMock = jest.spyOn(resourceManager, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('ResourceManagerV2', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ResourceManagerV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ResourceManagerV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ResourceManagerV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ResourceManagerV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ResourceManagerV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ResourceManagerV2);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ResourceManagerV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ResourceManagerV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ResourceManagerV2.DEFAULT_SERVICE_URL);
    });
  });
  describe('getAccountQuotaList', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAccountQuotaList
        const accountId = 'testString';
        const params = {
          accountId: accountId,
        };

        const getAccountQuotaListResult = resourceManager.getAccountQuotaList(params);

        // all methods should return a Promise
        expectToBePromise(getAccountQuotaListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/accounts/{account_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.getAccountQuotaList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.getAccountQuotaList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getAccountQuotaListPromise = resourceManager.getAccountQuotaList();
        expectToBePromise(getAccountQuotaListPromise);

        getAccountQuotaListPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getResourceQuota', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getResourceQuota
        const accountId = 'testString';
        const resourceType = 'testString';
        const params = {
          accountId: accountId,
          resourceType: resourceType,
        };

        const getResourceQuotaResult = resourceManager.getResourceQuota(params);

        // all methods should return a Promise
        expectToBePromise(getResourceQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/accounts/{account_id}/resource_types/{resource_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['resource_type']).toEqual(resourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const resourceType = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          resourceType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.getResourceQuota(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.getResourceQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getResourceQuotaPromise = resourceManager.getResourceQuota();
        expectToBePromise(getResourceQuotaPromise);

        getResourceQuotaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateResourceQuota', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateResourceQuota
        const accountId = 'testString';
        const resourceType = 'testString';
        const params = {
          accountId: accountId,
          resourceType: resourceType,
        };

        const updateResourceQuotaResult = resourceManager.updateResourceQuota(params);

        // all methods should return a Promise
        expectToBePromise(updateResourceQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/accounts/{account_id}/resource_types/{resource_type}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['resource_type']).toEqual(resourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const resourceType = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          resourceType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.updateResourceQuota(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.updateResourceQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateResourceQuotaPromise = resourceManager.updateResourceQuota();
        expectToBePromise(updateResourceQuotaPromise);

        updateResourceQuotaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteResourceQuota', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteResourceQuota
        const accountId = 'testString';
        const resourceType = 'testString';
        const params = {
          accountId: accountId,
          resourceType: resourceType,
        };

        const deleteResourceQuotaResult = resourceManager.deleteResourceQuota(params);

        // all methods should return a Promise
        expectToBePromise(deleteResourceQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/accounts/{account_id}/resource_types/{resource_type}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['resource_type']).toEqual(resourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const resourceType = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          resourceType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.deleteResourceQuota(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.deleteResourceQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteResourceQuotaPromise = resourceManager.deleteResourceQuota();
        expectToBePromise(deleteResourceQuotaPromise);

        deleteResourceQuotaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createDefaultResourceQuota', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createDefaultResourceQuota
        const resourceType = 'testString';
        const params = {
          resourceType: resourceType,
        };

        const createDefaultResourceQuotaResult = resourceManager.createDefaultResourceQuota(params);

        // all methods should return a Promise
        expectToBePromise(createDefaultResourceQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/resource_types/{resource_type}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['resource_type']).toEqual(resourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resourceType = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resourceType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.createDefaultResourceQuota(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.createDefaultResourceQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createDefaultResourceQuotaPromise = resourceManager.createDefaultResourceQuota();
        expectToBePromise(createDefaultResourceQuotaPromise);

        createDefaultResourceQuotaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSchema', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSchema
        const resourceType = 'testString';
        const params = {
          resourceType: resourceType,
        };

        const createSchemaResult = resourceManager.createSchema(params);

        // all methods should return a Promise
        expectToBePromise(createSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/resource_types/{resource_type}/schemas', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['resource_type']).toEqual(resourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resourceType = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resourceType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.createSchema(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.createSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSchemaPromise = resourceManager.createSchema();
        expectToBePromise(createSchemaPromise);

        createSchemaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSchema', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSchema
        const resourceType = 'testString';
        const params = {
          resourceType: resourceType,
        };

        const getSchemaResult = resourceManager.getSchema(params);

        // all methods should return a Promise
        expectToBePromise(getSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/resource_types/{resource_type}/schemas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['resource_type']).toEqual(resourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resourceType = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resourceType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.getSchema(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.getSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSchemaPromise = resourceManager.getSchema();
        expectToBePromise(getSchemaPromise);

        getSchemaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listQuotaDefinitions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listQuotaDefinitions
        const params = {};

        const listQuotaDefinitionsResult = resourceManager.listQuotaDefinitions(params);

        // all methods should return a Promise
        expectToBePromise(listQuotaDefinitionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.listQuotaDefinitions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceManager.listQuotaDefinitions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getQuotaDefinition', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getQuotaDefinition
        const id = 'testString';
        const params = {
          id: id,
        };

        const getQuotaDefinitionResult = resourceManager.getQuotaDefinition(params);

        // all methods should return a Promise
        expectToBePromise(getQuotaDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/quota_definitions/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.getQuotaDefinition(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.getQuotaDefinition({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getQuotaDefinitionPromise = resourceManager.getQuotaDefinition();
        expectToBePromise(getQuotaDefinitionPromise);

        getQuotaDefinitionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listResourceGroups', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listResourceGroups
        const accountId = 'testString';
        const date = 'testString';
        const params = {
          accountId: accountId,
          date: date,
        };

        const listResourceGroupsResult = resourceManager.listResourceGroups(params);

        // all methods should return a Promise
        expectToBePromise(listResourceGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/resource_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['date']).toEqual(date);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.listResourceGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceManager.listResourceGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createResourceGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createResourceGroup
        const name = 'test1';
        const accountId = '25eba2a9-beef-450b-82cf-f5ad5e36c6dd';
        const params = {
          name: name,
          accountId: accountId,
        };

        const createResourceGroupResult = resourceManager.createResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(createResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/resource_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.createResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceManager.createResourceGroup({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getResourceGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getResourceGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getResourceGroupResult = resourceManager.getResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(getResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/resource_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.getResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.getResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getResourceGroupPromise = resourceManager.getResourceGroup();
        expectToBePromise(getResourceGroupPromise);

        getResourceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateResourceGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateResourceGroup
        const id = 'testString';
        const name = 'testString';
        const state = 'testString';
        const params = {
          id: id,
          name: name,
          state: state,
        };

        const updateResourceGroupResult = resourceManager.updateResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(updateResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/resource_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['state']).toEqual(state);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.updateResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.updateResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateResourceGroupPromise = resourceManager.updateResourceGroup();
        expectToBePromise(updateResourceGroupPromise);

        updateResourceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteResourceGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteResourceGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteResourceGroupResult = resourceManager.deleteResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/resource_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManager.deleteResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await resourceManager.deleteResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteResourceGroupPromise = resourceManager.deleteResourceGroup();
        expectToBePromise(deleteResourceGroupPromise);

        deleteResourceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
