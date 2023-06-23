export interface EmojiItem {
  meaning: string
  expression: string
}

export enum ResponseCode {
  SUCCESS = '01',
  FAILURE = '02',
}

export interface Response<T> {
  code: ResponseCode
  result: T
}

export interface Page<T> {
  rows: T[]
  count: number
}

export interface Location {
  ip: string
  country: string
  province: string
  city: string
  district: string
}

export interface MessageItem {
  _id: string
  nickname: string
  content: string
  location: Location
  avatar: string
  createTime: string
  reviewed: boolean
  reply?: {
    text: string
    time: string
  }
}

export interface MessageForm {
  content: string
  nickname: string
  email: string
  notice: boolean
}
