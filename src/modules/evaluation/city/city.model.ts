import { ApiProperty } from '@nestjs/swagger'

export class CityInfo {
  @ApiProperty({ description: '城市名称' })
  cityname: string
}
