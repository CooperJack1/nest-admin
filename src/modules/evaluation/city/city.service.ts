import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'

import { Pagination } from '~/helper/paginate/pagination'
import { CityEntity } from '~/modules/evaluation/city/city.entity'
import { CityDto, CityQueryDto } from './city.dto'

@Injectable()
export class CityService {
  constructor(
@InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) { }

  /**
   * 查询城市列表
   */
  async list({
    page,
      pageSize,
      cityname,
  }: CityQueryDto): Promise<Pagination<CityEntity>> {
    const queryBuilder = await this.cityRepository
      .createQueryBuilder('city')
      .where({
        ...(cityname ? { cityname: Like(`%${cityname}%`) } : null),
      })

    return paginate<CityEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 增加城市
   */
  async create({ ...data }: CityDto): Promise<{ cityId: number }> {
    const city = await this.cityRepository.save({
      ...data,
    })

    return { cityId: city.id }
  }
}
