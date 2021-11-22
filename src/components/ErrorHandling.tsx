import { useEffect } from "react";
import "./styles/ErrorHandling.styles.css";
import { componentHello } from "./types/PostInterfaces";

const PageNotFound = (props: componentHello): JSX.Element => {
  useEffect(() => {
    console.log(`${props.helloMessage} ${props.componentName}`);
  }, [props.helloMessage, props.componentName]);
  return (
    <div className="errorTitle">
      <h1>404</h1>
      <h3>Page not found</h3>
    </div>
  );
};

export default PageNotFound;
