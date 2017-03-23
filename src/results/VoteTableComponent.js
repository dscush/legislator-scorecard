import React, { PropTypes } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

export default class VoteTableComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderLegislatorVote (v, progressivePosition) {
    if (v === 'n/a') {
      return <span className='badge badge-clear'>N/A</span>
    } else if (v === '-' && progressivePosition.toLowerCase() === 'no') {
      return <span className='badge badge-primary'>No</span>
    } else if (v === '+' && progressivePosition.toLowerCase() === 'yes') {
      return <span className='badge badge-primary'>Yes</span>
    } else if (v === '+' && progressivePosition.toLowerCase() === 'no') {
      return <span className='badge badge-default'>Yes</span>
    } else if (v === '-' && progressivePosition.toLowerCase() === 'yes') {
      return <span className='badge badge-default'>No</span>
    } else if (v === 'NV') {
      return <span className='badge badge-default'>Didn&#39;t vote</span>
    }
  }

  renderCumulativeVote (yesVotes, noVotes, progressivePosition) {
    const yesBlock = (<div>
      <span className='label votes-fw'>Yes:</span>&nbsp;
      <span className={`badge ${progressivePosition.toLowerCase() === 'yes' ? 'badge-primary' : 'badge-default'}`}>
        {yesVotes}
      </span>
    </div>)

    const noBlock = (<div>
      <span className='label votes-fw'>No:</span>&nbsp;
      <span className={`badge ${progressivePosition.toLowerCase() === 'no' ? 'badge-primary' : 'badge-default'}`}>
        {noVotes}
      </span>
    </div>)

    if (parseInt(yesVotes) >= parseInt(noVotes)) {
      return (
        <div>
          {yesBlock}
          {noBlock}
        </div>
      )
    } else {
      return (
        <div>
          {noBlock}
          {yesBlock}
        </div>
      )
    }
  }

  renderRow (v, i) {
    return (
      <tr key={i}>
        <td style={{ width: '30%' }}>
          <a href={v.url} target='_blank' className='font-weight-bold'>
            {v.title}
            <div>
              <span className='sr-only'>Topics:</span>
              {v.tags ? v.tags.split(',').map((t) => {
                return <span className='badge badge-default mr-1'>{t}</span>
              }) : null}
            </div>
          </a>
        </td>
        <td style={{ width: '40%' }}>
          <p>
            {v.description}
          </p>
          <p>
            <span className='label'>Progressive Position:</span>&nbsp;
            <span className='badge badge-primary'>{v.progressivePosition}</span>
          </p>
        </td>
        <td style={{ width: '15%' }}>
          {this.renderLegislatorVote(v.yourLegislator, v.progressivePosition)}
        </td>
        <td style={{ width: '15%' }}>
          {this.renderCumulativeVote(v.yesVotes, v.noVotes, v.progressivePosition)}
        </td>
      </tr>
    )
  }

  render () {
    if (!this.props.data || this.props.data.length === 0) {
      return <div className='table-container text-center'>
        <div style={{ paddingTop : '7rem' }}>
          <h3>This Data Isn't Available Yet!</h3>
          <p className='lead'>Please check back later.</p>
        </div>
      </div>
    }
    return (
      <div className='table-container'>
        <div className='explanatory-text'>
          <p>
            Progressive Massachussetts tracks legislation as it makes its way through the State House.
          </p>
          <p>
            To learn more about Progressive Massachussetts' methodology, including caveats and limitations,&nbsp;
            <a href='http://www.progressivemass.com/scorecards_and_roll_calls' target='_blank'>visit the Legislative Scorecard homepage.</a>
          </p>
        </div>
        <StickyContainer>
          <table className='table table-responsive'>
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Bill</th>
                  <th style={{ width: '40%' }}>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachussetts</a></th>
                  <th style={{ width: '15%' }}>{this.props.legislatorName}'s Vote</th>
                  <th style={{ width: '15%' }}>Vote Tally</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {this.props.data.map((v, i) => {
                return this.renderRow(v, i)
              }, this)}
            </tbody>

          </table>
        </StickyContainer>
      </div>
    )
  }
}

VoteTableComponent.propTypes = {
  data : PropTypes.array.isRequired,
  lastName : PropTypes.string.isRequired,
  voteRating : PropTypes.string.isRequired,
  voteSummary : PropTypes.number.isRequired

}
