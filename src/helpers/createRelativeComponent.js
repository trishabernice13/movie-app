import getDisplayName from 'recompose/getDisplayName';

const createRelativeComponent = (
  baseComponent,
  displayName,
  createdComponent
) => {
  createdComponent.displayName = `${getDisplayName(
    baseComponent
  )}.${displayName}`;
  baseComponent[displayName] = createdComponent;
  return createdComponent;
};

export default createRelativeComponent;
