import React, { PropTypes } from 'react'

export default class SortButton extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let image
    if (this.props.currentSort[0] === this.props.sort) {
      image = <img src={require('./../img/sort-arrows-selected.svg')} alt='' style={{ maxWidth : '20px' }} />
    } else {
      image = <img src={require('./../img/sort-arrows-faded.svg')} alt='' style={{ maxWidth : '20px' }} />
    }

    const rotated = (this.props.currentSort[0] === this.props.sort && this.props.currentSort[1] === 'desc')

    return (<button
      type='button'
      className='btn btn-sm btn-icon'
      onClick={() => this.props.onClick(this.props.sort)}
      aria-label='sort'>
      <span className={`${rotated ? 'rotated' : ''}`}>
        {image}
      </span>
    </button>)
  }
}

SortButton.propTypes = {
}
