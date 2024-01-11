import { api } from '.'

export type LatestDataResult = Record<
  string,
  {
    id: number
    buyer: string
    price: number
    vol: number
  }
>

export function latestDataQuery() {
  return api<LatestDataResult>('/lastdata').then((res) => Object.values(res))
}
