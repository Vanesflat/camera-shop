import { commerce, datatype, image, lorem, name } from 'faker';
import { Category, Coupon, Level, Type } from '../const';
import { Camera, CameraWithoutRating } from '../types/camera';
import { Notification } from '../types/notification';
import { Promo } from '../types/promo';
import { Review } from '../types/review';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: lorem.word(),
  type: Type.Collectible,
  category: Category.Camera,
  description: commerce.productDescription(),
  level: Level.Amateur,
  price: datatype.number(),
  reviewCount: datatype.number({ max: 10 }),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  rating: datatype.number()
});

export const makeFakeCameraWithoutRating = (): CameraWithoutRating => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: lorem.word(),
  type: Type.Collectible,
  category: Category.Camera,
  description: commerce.productDescription(),
  level: Level.Amateur,
  price: datatype.number(),
  reviewCount: datatype.number({ max: 10 }),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl()
});

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  createAt: datatype.string(),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  review: lorem.words(),
  rating: datatype.number()
});

export const makeFakeNotification = (): Notification => ({
  id: datatype.uuid(),
  type: 'error',
  message: lorem.text(),
  duration: datatype.number({ min: 1000, max: 4000 })
});

export const makeFakeCoupon = (): Coupon => lorem.word() as Coupon;
