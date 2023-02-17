import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/modules/common/constants';
import { EAppRoles } from 'src/modules/common/types';

export const Roles = (...roles: EAppRoles[]) => SetMetadata(ROLES_KEY, roles);
