import { FileHandle } from "./file-handle.model"

export interface Product {
  id: any,
  name: string,
  description: string,
  discountedPrice: number,
  actualPrice: number,
  productImages: FileHandle[]
}
