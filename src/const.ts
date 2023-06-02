export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/:page',
  Basket = '/basket',
  Product = '/product/:id'
}

export enum APIRoute {
  Cameras = '/cameras',
  Similar = '/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupon = '/coupons',
  Order = '/orders'
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Promo = 'PROMO',
}

export enum Type {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная'
}

export enum Category {
  Videocamera = 'Видеокамера',
  Camera = 'Фотоаппарат'
}

export enum Level {
  Null = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный'
}
