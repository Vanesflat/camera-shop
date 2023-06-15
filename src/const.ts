export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/:page',
  Basket = '/basket',
  Product = '/product'
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
  App = 'APP',
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  SimilarCameras = 'SIMILAR-CAMERAS',
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

export enum SortType {
  SortPrice = 'по цене',
  SortPopular = 'по популярности'
}

export enum SortOrder {
  Up = 'По возрастанию',
  Down = 'По убыванию'
}

export const sortOrderQueryValue = {
  [SortOrder.Up]: 'asc',
  [SortOrder.Down]: 'desc'
};

export const sortTypeQueryValue = {
  [SortType.SortPopular]: 'popular',
  [SortType.SortPrice]: 'price'
};

export const STARS_COUNT = 5;
export const DEFAULT_PRODUCT_TAB = 'description';
