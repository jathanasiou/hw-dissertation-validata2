import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Octicon from '@primer/octicons-react';

class CardControlGroup extends React.PureComponent {
  render() {
    const {
      header, bodyTitle, icon, children, ...rest
    } = this.props;
    const title = (bodyTitle)
      ? <Card.Title>{bodyTitle}</Card.Title>
      : '';

    const iconElement = (icon)
      ? <Octicon className="inline-icon size30" verticalAlign="middle" icon={icon} />
      : '';

    return (
      <Card {...rest} className="shadow">
        <Card.Header as="h5" className="bg-primary text-white">
          {iconElement}
          <span>{header}</span>
        </Card.Header>
        <Card.Body>
          {title}
          {children}
        </Card.Body>
      </Card>
    );
  }
}

CardControlGroup.defaultProps = {
  icon: null,
  bodyTitle: '',
};

CardControlGroup.propTypes = {
  icon: PropTypes.func,
  header: PropTypes.string.isRequired,
  bodyTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default CardControlGroup;
