import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCameras } from '../../store/reducers/cameras/selectors';
import { getPromo } from '../../store/reducers/promo/selectors';
import Loader from '../loader/loader';

function Banner(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const cameras = useAppSelector(getCameras);

  const promoDescription = cameras.find((camera) => camera.name === promo?.name)?.description;

  if (!promo) {
    return <Loader />;
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`} />
        <img
          src={promo.previewImg}
          srcSet={promo.previewImg2x}
          width="1280"
          height="280"
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">{promoDescription}</span>
        <Link className="btn" to={generatePath(AppRoute.Product, {id: String(promo.id)})}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
