import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'

import { CityDto, CityQueryDto } from './city.dto'
import { CityEntity } from './city.entity'
import { CityService } from './city.service'

export const permissions = definePermission('evaluation:city', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('Evaluation - 城市模块')
@ApiSecurityAuth()
@Controller('city')
export class CityController {
  constructor(
    private cityService: CityService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取城市列表' })
  @ApiResult({ type: [CityEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: CityQueryDto) {
    return this.cityService.list(dto)
  }

  @Post()
  @ApiOperation({ summary: '新增城市' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: CityDto): Promise<void> {
    await this.cityService.create(dto)
  }
}
