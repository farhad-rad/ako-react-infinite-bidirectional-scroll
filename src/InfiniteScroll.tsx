import React, { Fragment, useState } from "react";
import { LoaderItem } from "./LoaderItem";
import { SimpleItem } from "./SimpleItem";
import { Loader } from "./Loader";

type InfiniteScrollProps = {
  children?: JSX.Element | JSX.Element[];
  nextDataLoader?: () => void;
  loadingNext?: boolean;
  previousDataLoader?: () => void;
  loadingPrevious?: boolean;
  initialLoad?: boolean;
  loader?: JSX.Element | JSX.Element[] | string | string[];
};

const InfiniteScroll: React.FunctionComponent<InfiniteScrollProps> = (
  props : InfiniteScrollProps
) => {
  const children =
    props.children &&
    (Array.isArray(props.children) ? props.children : [props.children]);

  if (children) {
    if (children.some((x) => !x.props || !x.props.uniqueKey))
      throw new Error("keyless children exception");
    if (
      new Set(children.map((x) => x.props.uniqueKey)).size !==
      children.map((x) => x.props.uniqueKey).length
    )
      throw new Error("non-unique key children exception");
  }
  if (!props.nextDataLoader && !props.previousDataLoader)
    throw new Error("no loader exception");

  const [initial, setInitial] = useState(
    props.initialLoad === true ? false : true
  );
  const [marked, setMarked]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(children.length > 0 ? children[0].props.uniqueKey : null);

  const loadingPrevious = props.loadingPrevious || false;
  const loadingNext = props.loadingNext || false;

  const handleNextDataLoad = () => {
    if (!props.nextDataLoader) return;
    if (initial) {
      setInitial(false);
      return;
    }
    props.nextDataLoader();
    children.length > 0 && setMarked(children[0].props.uniqueKey);
  };
  const handlePreviousDataLoad = () => {
    if (!props.previousDataLoader) return;
    if (initial) {
      setInitial(false);
      return;
    }
    props.previousDataLoader();
    children.length > 0 && setMarked(children[0].props.uniqueKey);
  };

  const loader = props.loader || <Loader />;
  return (
    <Fragment>
      {loadingPrevious && loader}
      <div style={{ height: "100%", overflowY: "auto" }}>
        {children.map((item, index) => {
          if (index === 0) {
            return (
              <LoaderItem
                uniqueKey={item.props.uniqueKey}
                handler={handlePreviousDataLoad}
                marked={marked}
              >
                {item}
              </LoaderItem>
            );
          }
          if (index === children.length - 1) {
            return (
              <LoaderItem
                uniqueKey={item.props.uniqueKey}
                handler={handleNextDataLoad}
              >
                {item}
              </LoaderItem>
            );
          }
          return (
            <SimpleItem uniqueKey={item.props.uniqueKey} marked={marked}>
              {item}
            </SimpleItem>
          );
        })}
      </div>
      {loadingNext && loader}
    </Fragment>
  );
};
export default InfiniteScroll;
