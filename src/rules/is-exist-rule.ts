// 验证数据是否存在 -- dto验证规则
// 文档参考：https://github.com/typestack/class-validator#custom-validation-decorators

import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationOptions } from 'class-validator'

/**
 *
 * @param tableName 需要验证的数据库表名
 * @param validationOptions 其它选项
 * @param isRevers false 验证已存在 true 验证不存在
 * @returns
 */
export function IsExistRule(tableName: string, validationOptions?: ValidationOptions, isRevers = false) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExistRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [tableName],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const prisma = new PrismaClient()

          const res = await prisma.users.findFirst({
            where: {
              [propertyName]: value,
            },
          })

          return isRevers ? Boolean(res) : !Boolean(res)
        },
      },
    })
  }
}
