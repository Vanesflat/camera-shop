import classes from './cameras-empty.module.scss';

function CamerasEmpty(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <svg
        fill="#7575e2"
        width="170px"
        height="170px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#7575e2"
        strokeWidth="0.00016"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="m9 4.45-2 2-2-2-1 1 2 2-2 2 1 1 2-2 2 2 1-1-2-2 2-2zm2.77 6.63c.77-1.01 1.23-2.27 1.23-3.63 0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.37 0 2.63-.46 3.64-1.24l2.79 2.79 1.13-1.13zm-4.87.76c-2.48 0-4.49-2.02-4.49-4.5s2.02-4.5 4.49-4.5 4.5 2.02 4.5 4.5-2.03 4.5-4.5 4.5z"></path>
        </g>
      </svg>
      <p className={classes.text}>По вашему запросу ничего не найдено</p>
    </div>
  );
}

export default CamerasEmpty;
