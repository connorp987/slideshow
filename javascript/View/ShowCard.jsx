import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'
import './custom.css'

import AppLogo from "../../img/showimg.png"

export default class ShowCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
        img: AppLogo,
        active: 0,
        sessionFlag: 0 // case 0: begin/start
                      // case 1: continue
                      // case 2: review
    }

    this.getSessionInfo = this.getSessionInfo.bind(this)
    this.presentTransition = this.presentTransition.bind(this)
  }

  componentDidMount() {
    this.getSessionInfo()
  }

  presentTransition() {
    window.sessionStorage.setItem('id', this.props.id)
    window.location.href = './slideshow/Slide/Present/'
  }

  getSessionInfo() {
    $.ajax({
      url: './slideshow/Session/' + this.props.id,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(this.props.id)
        console.log(data)
        console.log(data.highestSlide)
        let session = 0
        if (Number(data.completed)) {
          session = 2 // Review
        }
        else if (Number(data.highestSlide) > 0) {
          session = 1 // continue
        }

        this.setState({
          sessionFlag: session
        })
      }.bind(this)
    })
  }


  render() {

    let present = undefined
    switch (this.state.sessionFlag) {
      case 0:
        present = <Button onClick={this.presentTransition} variant="primary">Begin</Button>
        break;
      case 1:
        present =
        <OverlayTrigger placement="bottom"
          overlay={
            <Tooltip>
              Incomplete. Click to continue
            </Tooltip>
          }>
            <Button onClick={this.presentTransition} variant="warning">Continue</Button>
          </OverlayTrigger>
        break;
      case 2:
        present =
        <OverlayTrigger placement="bottom"
          overlay={
            <Tooltip>
              Completed. Click to review
            </Tooltip>
          }>
            <Button onClick={this.presentTransition} variant="success" >Review</Button>
        </OverlayTrigger>
        break;
    }

    return (
      <div style={{paddingBottom: "25px"}}>
        <Card>
          <div className="card-img-caption">
            <img className="card-img-top" src={this.state.img}/>
          </div>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center">
              {this.props.title}
            </Card.Title>
            <div className="d-flex justify-content-around">
              {present}
            </div>
          </Card.Body>
        </Card>
      </div>
    )
}

}

ShowCard.propTypes = {
   //id: PropTypes.string,
   title: PropTypes.string,
   //active: PropTypes.number,
   //load: PropTypes.function
 }