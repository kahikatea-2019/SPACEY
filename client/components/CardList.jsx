import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCards } from '../api/cards'

class CardList extends React.Component {
  componentDidMount () {
    this.props.dispatch(getCards())
  }
//I have now implemeneted milliseconds, also will be 
  checkDateCreated = (card) => {
    if ((Date.now() > card.dateCreated + 60000) && (card.check1.length === 0)) {
      console.log(`(${Date.now()} > ${card.dateCreated + 60}) && (${card.check1.length} === 0)`)
      return <img width='50px'src='/images/exclamation.png' /> 
      
    }
    if ((Date.now() > card.check1 + 120000) && (card.check2.length === 0)){
      console.log('second')
      return <img width='50px'src='/images/exclamation.png' /> 
    }
    if ((Date.now() > card.check2 + 180000) && (card.check3.length === 0)){
      console.log('third')
      return <img width='50px'src='/images/exclamation.png' /> 
    }
    console.log('tick')
    return <img width='50px' src='/images/tick.png'/>
  }


  render () {
    return (
      <React.Fragment>
        <div className='container is-fluid has-text-centered'>
          <div className='cardList'>
            <h1 className='title is-1'>Card List:</h1>
            {this.props.cards.map(card => {
              if (card.categoryId == this.props.match.params.id) {
                return (
                  <Link to={`/display/${card.id}`} key={card.id}>
                    <article className='message is-info' key={card.id}>
                      <div className='message-header'>
                        <p>{card.question}</p>
                        {this.checkDateCreated(card)}
                      </div>
                    </article> 
                  </Link>
                )
              }
            })}
          </div>
        </div>
        <Link to={`/addcard/${this.props.match.params.id}`}><button>Add Card</button></Link>
      </React.Fragment>
      
    )
  }
}

function mapStateToProps (state) {
  return {
    cards: state.cards,
    categories: state.categories,
    userDetails: state.userDetails
  }
}

export default connect(mapStateToProps)(CardList)

//Have the state of this notifcation based on a switch statement
//Have the switch statement go through the dateCreated property of the cards field, if the dateCreated value is > 60 then 