import "./styles/ErrorHandling.styles.css";

const pageNotFound = (): JSX.Element => {
  return (
    <div className="errorTitle">
      <h1>404</h1>
      <h3>Page not found</h3>
    </div>
  );
};

export default pageNotFound;
