import classes from './loader.module.scss';

function Loader(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
