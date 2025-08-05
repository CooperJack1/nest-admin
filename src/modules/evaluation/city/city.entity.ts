import {
  Column,
  Entity,
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'evaluation_city' })
export class CityEntity extends CommonEntity {
  @Column({ unique: true })
  cityname: string
}
