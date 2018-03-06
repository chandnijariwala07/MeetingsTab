import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { reduxForm } from 'redux-form'
import { PanelGroup, Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import TextInput from 'components/TextInput/TextInput'
import '../assets/MeetingsList.scss'
import DateSign from './DateSign'
import MeetingsNetworking from './MeetingsNetworking'
import MeetingsConsultation from './MeetingsConsultation'
import MeetingsReferral from './MeetingsReferral'
import { selectAddressbook } from '../store/selectors'

const PersonDisplay = ({ person, roles }) => {
  const role = roles.find(r => r.id === person.role)
  return (
    <div className='flex-item'>
      <div className='minutes-text-bold'>{role && role.label}</div>
      <div className='minutes-text'>
        <i className='fa fa-user' /> {person.firstName} {person.lastName}
      </div>
    </div>
  )
}
PersonDisplay.propTypes = {
  person: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
}

class Meetings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      consultation: {
        selected: null,
        sortBy: null,
        isDesc: false
      },
      referral: {
        selected: null,
        sortBy: null,
        isDesc: false
      },
      networking: {
        selected: null,
        sortBy: null,
        isDesc: false
      }
    }
  }

  _handleCreateConsultation = () => {
    this.setState({
      consultation: { ...this.state.consultation, selected: {} }
    })
  }

  _handleCreateReferral = () => {
    this.setState({
      referral: { ...this.state.referral, selected: {} }
    })
  }
  _handleCreateNetworking = () => {
    this.setState({
      networking: { ...this.state.networking, selected: {} }
    })
  }

  _handleCloseConsultation = () => {
    this.setState({
      consultation: { ...this.state.consultation, selected: null }
    })
  }
  _handleCloseReferral = () => {
    this.setState({
      referral: { ...this.state.referral, selected: null }
    })
  }
  _handleCloseNetworking = () => {
    this.setState({
      networking: { ...this.state.networking, selected: null }
    })
  }

  _renderSort = (key, a, label) => {
    const { sortBy, isDesc } = this.state[key]
    const asc = sortBy === a && !isDesc
    const desc = sortBy === a && isDesc
    const handle = e => {
      e.preventDefault()
      if (desc) {
        this.setState({ [key]: { ...this.state[key], sortBy: null, isDesc: false } })
      } else {
        this.setState({ [key]: { ...this.state[key], sortBy: a, isDesc: sortBy === a } })
      }
    }
    return <button className='sort' onClick={handle}>
      <div className={classnames('indicator', { asc, desc })}>
        <div className='asc' />
        <div className='desc' />
      </div>
      <div className='caption'>{label}</div>
    </button>
  }

  static propTypes = {
    data: PropTypes.shape({
      minutes: PropTypes.shape({
        consultation: PropTypes.array.isRequired,
        referral: PropTypes.array.isRequired,
        networking: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,
    fields: PropTypes.object.isRequired,
    addressbook: PropTypes.array.isRequired,
    counsellingGroup: PropTypes.array.isRequired,
    counsellingPlace: PropTypes.array.isRequired,
    targetCategories: PropTypes.array.isRequired,
    enumPersonRole: PropTypes.array.isRequired,
    networkingGroup: PropTypes.array.isRequired
  }

  _strcmp = (a, b) => {
    // const ia = a.indexOf('⚠')
    // const ib = b.indexOf('⚠')
    return a.localeCompare(b)
  }

  _createSort = key => (a, b) => {
    const { sortBy, isDesc } = this.state[key]
    const val = obj => sortBy.split('.').reduce((o, p) => o && o[p], obj) || undefined
    const d = isDesc ? -1 : 1
    a = val(a)
    b = val(b)
    if (!a) {
      if (!b) return 0
      return -d
    }
    if (!b) return d
    return typeof a === 'string'
      ? d * this._strcmp(a, b)
      : d * (a < b ? -1 : 1)
  }

  render () {
    const {
      data,
      fields: {
        searchConsultation,
        searchReferral,
        searchNetworking
      },
      counsellingGroup,
      counsellingPlace,
      targetCategories,
      enumPersonRole,
      networkingGroup,
      addressbook
    } = this.props
    const minutes = data.minutes
    const displayLabel = (id, list) => (list.find(d => d.id === id) || {}).label
    const displayName = (id) => (addressbook.find(a => a.id === id) || {})
    const lists = {}
    Object.entries({
      consultation: searchConsultation.value,
      referral: searchReferral.value,
      networking: searchNetworking.value
    }).forEach(([key, value]) => {
      console.log(key, value)
      const list = minutes[key].filter(m => !value || ~m.text.toLowerCase().indexOf(value.toLowerCase()))
      lists[key] = this.state[key].sortBy ? list.sort(this._createSort(key)) : list
    })
    const selectedConsultation = this.state.consultation.selected
    const selectedReferral = this.state.referral.selected
    const selectedNetworking = this.state.networking.selected

    return (
      <form>
        <PanelGroup accordion id='accordion-controlled-example' className='integrator-minutes'>
          <Panel>
            <Panel.Heading>
              <Panel.Toggle>
                <Panel.Title componentClass='h4'>Beratung</Panel.Title>
                Dokumentieren Sie hier alle Ihre Beratungsgespräche
              </Panel.Toggle>
            </Panel.Heading>
            <Panel.Body collapsible>
              <div className='sorting-container'>
                {this._renderSort('consultation', 'date', 'Datum')}
                {this._renderSort('consultation', 'kind', 'Art')}
                {this._renderSort('consultation', 'category', 'Thema')}
              </div>
              <TextInput placeholder='suche...' field={searchConsultation} />
              <Button bsStyle='success' onClick={this._handleCreateConsultation}>
                <i className='fa fa-plus' /> Treffen hinzufügen
              </Button>
              <MeetingsConsultation data={data} show={!!selectedConsultation} model={selectedConsultation}
                onClose={this._handleCloseConsultation} />
              {' '}
              <ListGroup>
                {lists['consultation'].map(m =>
                  <ListGroupItem key={m.id} onClick={() => {
                    this.setState({ consultation: { ...this.state.consultation, selected: m } })
                  }}className={m === selectedConsultation && 'active'}>
                    <div className='flex-container'>
                      <div className='flex-item minutes-text'><DateSign date={m.date} /></div>
                      <div className='flex-item'>
                        <div className='minutes-text-bold'>{displayLabel(m.kind, counsellingGroup)}
                          {' '}{m.attendeeCount}
                        </div>
                        {' '}
                        <div className='minutes-text'><i className='fa fa-map-marker' />{' '}
                          {displayLabel(m.location, counsellingPlace)}
                        </div>
                      </div>
                      <div className='flex-item'>
                        <div className='minutes-text-bold'>
                          {displayLabel(m.category, targetCategories)}</div>
                      </div>
                    </div>
                    <div className='minutes-notes'>{m.text}</div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Heading>
              <Panel.Toggle>
                <Panel.Title componentClass='h4'>Weiterleitung an Regeldienste</Panel.Title>
                Dokumentieren Sie hier alle alle Weiterleitungen an Regeldienste
              </Panel.Toggle>
            </Panel.Heading>
            <Panel.Body collapsible>
              <div className='sorting-container'>
                {this._renderSort('referral', 'date', 'Datum')}
                {this._renderSort('referral', 'personType', 'Regeldienst')}
              </div>
              <TextInput placeholder='search...' field={searchReferral} />
              <Button bsStyle='success' onClick={this._handleCreateReferral}>
                <i className='fa fa-plus' /> Treffen hinzufügen
              </Button>
              <MeetingsReferral data={data} show={!!selectedReferral} model={selectedReferral}
                onClose={this._handleCloseReferral} />
              <ListGroup>
                {lists['referral'].map(m =>
                  <ListGroupItem key={m.id} onClick={() => {
                    this.setState({ referral: { ...this.state.referral, selected: m } })
                  }}className={m === selectedReferral && 'active'}>
                    <div className='flex-container'>
                      <div className='flex-item minutes-text'><DateSign date={m.date} /></div>
                      <PersonDisplay person={displayName(m.person)} roles={enumPersonRole} />
                    </div>
                    <div className='minutes-notes'>{m.text}</div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Heading>
              <Panel.Toggle>
                <Panel.Title componentClass='h4'>Vernetzung</Panel.Title>
                Dokumentieren Sie hier alle Ihre Vernetzungen und Kontakte
              </Panel.Toggle>
            </Panel.Heading>
            <Panel.Body collapsible>
              <div className='sorting-container'>
                {this._renderSort('networking', 'date', 'Datum')}
                {this._renderSort('networking', 'group', 'Gruppe')}
              </div>
              <TextInput placeholder='search...' field={searchNetworking} />
              <Button bsStyle='success' onClick={this._handleCreateNetworking}>
                <i className='fa fa-plus' /> Treffen hinzufügen
              </Button>
              <MeetingsNetworking data={data} show={!!selectedNetworking} model={selectedNetworking}
                onClose={this._handleCloseNetworking} />
              <ListGroup>
                {lists['networking'].map(m =>
                  <ListGroupItem key={m.id} onClick={() => {
                    this.setState({ networking: { ...this.state.networking, selected: m } })
                  }}className={m === selectedNetworking && 'active'}>
                    <div className='flex-container'>
                      <div className='flex-item minutes-text'><DateSign date={m.date} /></div>
                      <div className='flex-item'>
                        <div className='minutes-text-bold'>{displayLabel(m.group, networkingGroup)}</div>
                        <PersonDisplay person={displayName(m.person)} roles={enumPersonRole} />
                      </div>
                    </div>
                    <div className='minutes-notes'>{m.text}</div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </form>
    )
  }
}

const config = {
  form: 'Meetings',
  fields: ['searchConsultation', 'searchReferral', 'searchNetworking']
}

const mapStateToProps = (state, ownProps) => ({
  minutes: state.integrator.minutes,
  counsellingGroup: state.masterData.counsellingGroup,
  counsellingPlace: state.masterData.counsellingPlace,
  targetCategories: state.masterData.targetCategories,
  enumPersonRole: state.masterData.enumPersonRole,
  networkingGroup: state.masterData.networkingGroup,
  initialValues: {
    searchConsultation: '',
    searchReferral: '',
    searchNetworking: ''
  },
  addressbook: [
    ...Object.values(selectAddressbook(state)).filter(p => p.sharing !== 'hidden'),
    ...(ownProps.data ? ownProps.data.client.people : [])
      .map(p => {
        p.sharing = 'client'
        return p
      })
  ]
})

export default reduxForm(config, mapStateToProps)(Meetings)
