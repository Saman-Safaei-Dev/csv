import { api } from '.'

export type SingleBuyerData = {
  id: number
  buyer: string
  price: number
  vol: number
}

export type LatestDataResult = Record<string, SingleBuyerData>

export function latestDataQuery() {
  return api<LatestDataResult>('/lastdata').then((res) => Object.values(res))
}
