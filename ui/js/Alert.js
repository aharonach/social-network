class Alert extends React.Component {
  icon() {
    switch (this.props.type) {
      case 'warning':
        return 'exclamation-triangle';

      case 'error':
        return 'times-circle';

      case 'success':
      default:
        return 'check-circle';
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: 'alert ' + this.props.type
    }, /*#__PURE__*/React.createElement("i", {
      className: 'fa fa-' + this.icon(),
      "aria-hidden": "true"
    }), " ", this.props.message);
  }

}

export default Alert;