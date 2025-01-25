import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'

export const modelCanvas = defineMongooseModel('Canvas', {
  deviceId: { type: Types.ObjectId },
  authorId: { type: Types.ObjectId, ref: modelUser },
  grid: { type: JSON },
  content: { type: JSON }
})