import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import {
  IsString,
  MinLength,
} from 'class-validator'

import { OperatorDto } from '~/common/dto/operator.dto'
import { PagerDto } from '~/common/dto/pager.dto'
import { IsUnique } from '~/shared/database/constraints/unique.constraint'

import { CityEntity } from './city.entity'

export class CityDto extends OperatorDto {
  @IsUnique({ entity: CityEntity })
  @ApiProperty({ description: '城市名称' })
  @IsString()
  @MinLength(2, { message: '城市名称长度不能小于2' })
  cityname: string
}

export class CityQueryDto extends IntersectionType(PagerDto<CityDto>, PartialType(CityDto)) {
  @ApiProperty({ description: '城市名称', required: false })
  @IsString()
  cityname?: string
}
