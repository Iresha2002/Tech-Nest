  export interface Review {
  rating: number, comment: string, date: string, reviewerName: string 
  }
export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
   image?: string
  images: string[]
  availabilityStatus: string
shippingInformation: string
returnPolicy: string
tags: string[]
reviews: Review[]

}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}