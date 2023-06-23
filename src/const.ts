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
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Basket = 'BASKET',
  Reviews = 'REVIEWS',
  SimilarCameras = 'SIMILAR-CAMERAS',
  Sort = 'SORT',
  Filter = 'FILTER',
  Notification = 'NOTIFICATION'
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

export enum BasketItemType {
  Standart = 'standart',
  Add = 'add',
  Remove = 'remove'
}

export enum Coupon {
  First = 'camera-333',
  Second = 'camera-444',
  Third = 'camera-555'
}

export const sortOrderQueryValue = {
  [SortOrder.Up]: 'asc',
  [SortOrder.Down]: 'desc'
};

export const STARS_COUNT = 5;
export const DEFAULT_PRODUCT_TAB = 'description';
