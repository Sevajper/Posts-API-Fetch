const withHello =
  (WrappedComponent: any) =>
  ({ ...props }) => {
    console.log(`Hello from ${WrappedComponent.name}`);
    return <WrappedComponent {...props} />;
  };

export default withHello;
