import PropTypes from 'prop-types';

export const FileShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
});
