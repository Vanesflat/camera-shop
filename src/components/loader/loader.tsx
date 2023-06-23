import cn from 'classnames';
import classes from './loader.module.scss';

type LoaderProps = {
  isSmall?: boolean;
};

function Loader({ isSmall }: LoaderProps): JSX.Element {
  return (
    <div className={cn(!isSmall && classes.wrapper)} data-testid="loader">
      <div className={cn(classes.loader, isSmall && classes.small)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
