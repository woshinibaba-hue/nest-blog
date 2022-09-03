// 验证数据是否存在 -- dto验证规则
// 文档参考：https://github.com/typestack/class-validator#custom-validation-decorators

import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsExistRule(tableName: string, validationOptions?: ValidationOptions) {
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

          return !Boolean(res)
        },
      },
    })
  }
}
