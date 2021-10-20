import React from "react";
import ReactDOM from "react-dom";

type SimpleItemProps = {
  marked: number;
  uniqueKey: number;
}

class SimpleItem extends React.Component<SimpleItemProps> {
  componentDidMount() {
    if (this.props.marked && this.props.marked === this.props.uniqueKey) {
      ReactDOM.findDOMNode(this).scrollIntoView();
      ReactDOM.findDOMNode(this).previousSibling.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
  render() {
    return this.props.children;
  }
}
export default SimpleItem;
export { SimpleItem };
