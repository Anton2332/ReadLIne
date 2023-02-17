import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { EAppRoles } from 'src/modules/common/types';
import { IdDTO, TokenDTO } from 'src/modules/common/dtos';
import { applyDecorators, Controller, Delete, Get, Patch, Post, Put, Type, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/common/decorators';
import { RolesGuard } from '../guards';

export const ApiLoginResponse = (role: EAppRoles) =>
  ApiResponse({
    status: 200,
    description: `${role} successfully login!`,
    type: TokenDTO
  });

export const ApiGetResponse = (description: string, type: Type<unknown> | Function | [Function] | string) =>
  ApiResponse({ status: 200, description, type });

export const ApiCreateResponse = (description: string, type: () => void) => ApiResponse({ status: 201, description, type });

export const ApiUpdateResponse = (description: string) => ApiResponse({ status: 201, description, type: IdDTO });

export function ApiController(name: string) {
  return applyDecorators(ApiTags(name), Controller(name));
}

function ApiDoc(description: string, responseEntity: Type<unknown> | Function | [Function] | string, responseDescription: string) {
  return applyDecorators(
    ApiOperation({ summary: description }),
    ApiGetResponse(responseDescription, responseEntity),
    ApiInternalServerErrorResponse({ status: 500, description: 'Internal Server Error' })
  );
}

export function AuthMethod(roles: EAppRoles[]) {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  );
}

export function ApiGet(path: string, description: string, responseEntity: Type<unknown> | Function | [Function] | string) {
  const responseDescription = `Successfully fetched page of ${responseEntity.constructor.name}`;
  return applyDecorators(Get(path), ApiDoc(description, responseEntity, responseDescription));
}

export function ApiPost(path: string, description: string, responseEntity: Type<unknown> | Function | [Function] | string) {
  const responseDescription = `Successfully create ${responseEntity.constructor.name}`;
  return applyDecorators(Post(path), ApiDoc(description, responseEntity, responseDescription));
}

export function ApiPut(path: string, description: string, responseEntity: Type<unknown> | Function | [Function] | string) {
  const responseDescription = `Successfully update ${responseEntity.constructor.name}`;
  return applyDecorators(Put(path), ApiDoc(description, responseEntity, responseDescription));
}

export function ApiPatch(path: string, description: string, responseEntity: Type<unknown> | Function | [Function] | string) {
  const responseDescription = `Successfully update ${responseEntity.constructor.name}`;
  return applyDecorators(Patch(path), ApiDoc(description, responseEntity, responseDescription));
}

export function ApiDelete(path: string, description: string, responseEntity: Type<unknown> | Function | [Function] | string) {
  const responseDescription = `Successfully delete ${responseEntity.constructor.name}`;
  return applyDecorators(Delete(path), ApiDoc(description, responseEntity, responseDescription));
}

export function ApiAuthGet(
  path: string,
  description: string,
  responseEntity: Type<unknown> | Function | [Function] | string,
  roles: EAppRoles[]
) {
  return applyDecorators(Get(path), ApiGet(path, description, responseEntity), AuthMethod(roles));
}

export function ApiAuthPost(
  path: string,
  description: string,
  responseEntity: Type<unknown> | Function | [Function] | string,
  roles: EAppRoles[]
) {
  return applyDecorators(Post(path), ApiPost(path, description, responseEntity), AuthMethod(roles));
}

export function ApiAuthPut(
  path: string,
  description: string,
  responseEntity: Type<unknown> | Function | [Function] | string,
  roles: EAppRoles[]
) {
  return applyDecorators(Put(path), ApiPut(path, description, responseEntity), AuthMethod(roles));
}

export function ApiAuthPatch(
  path: string,
  description: string,
  responseEntity: Type<unknown> | Function | [Function] | string,
  roles: EAppRoles[]
) {
  return applyDecorators(Patch(path), ApiPatch(path, description, responseEntity), AuthMethod(roles));
}

export function ApiAuthDelete(
  path: string,
  description: string,
  responseEntity: Type<unknown> | Function | [Function] | string,
  roles: EAppRoles[]
) {
  return applyDecorators(Delete(path), ApiDelete(path, description, responseEntity), AuthMethod(roles));
}
