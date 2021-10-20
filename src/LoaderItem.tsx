import React from "react";
import ReactDOM from "react-dom";
import { InView } from "react-intersection-observer";

type LoaderItemProps = {
  marked?: number;
  uniqueKey: number;
  handler?: () => void;
};

class LoaderItem extends React.Component<LoaderItemProps> {
  static defaultProps = {
    marked: 1,
    handler: () => {},
  };
  componentDidMount() {
    if (this.props.marked && this.props.marked === super.props.uniqueKey)
      ReactDOM.findDOMNode(this).scrollIntoView();
  }
  render() {
    return (
      <InView
        onChange={(inView) =>
          inView && this.props.handler && this.props.handler()
        }
      >
        {this.props.children}
      </InView>
    );
  }
}
export default LoaderItem;
export { LoaderItem };
