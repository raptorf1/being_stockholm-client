import React, { Component } from 'react'
import { Form, Button, Icon, Message, Segment, Container, Sidebar } from 'semantic-ui-react';
import axios from 'axios';
import ImageUploader from 'react-images-upload'
import MessageTopSidebar from './MessageTopSidebar';
import PropTypes from 'prop-types'

const TopSidebar = ({ visible, message }) => (
  <Sidebar
    id='message-topsidebar'
    as={Segment}
    animation='overlay'
    direction='top'
    visible={visible}>
 
    <p>{message}</p>
    
  </Sidebar>
)

TopSidebar.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
}


class PostForm extends Component {
  state = {
    caption: '',
    image: '',
    longitude: '',
    latitude: '',
    category: 'play',
    showPostForm: true,
    successMessage: false,
    errorMessage: false,
    errors: '',
    activeItem: 'play',
    button: 'show-button',
    form: 'show-form',
    toggle: 'show-toggle',
    messageVisible: false,
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onImageDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs,
      button: 'hide-button'
    })
  }

  uploadPost = (e) => {
    e.preventDefault();
    const path = '/api/v1/posts'
    const payload = {
      image: this.state.image,
      caption: this.state.caption,
      category: this.state.category,
      longitude: 53.06,
      latitude: 18.03
    }

    axios.post(path, payload)
      .then(response => {
        console.log(response)
        this.setState({
          successMessage: true,
          showPostForm: false,
          errorMessage: false,
          form: 'hide-form',
          toggle: 'hide-toggle',
          messageVisible: true,
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: true,
          messageVisible: true,
          errors: error.response.data.error
        })
        
        // if (this.state.messageVisible === true) {
        //   setTimeout(function () {this.state.messageVisible= false}, 2000 )
        // }

      })
  }

  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value, activeItem: e.target.value })
  }

  handleMessageVisibility = animation => () =>
    this.setState(prevState => ({ animation, messageVisible: !prevState.messageVisible })
    )


  render() {
    let message

    if (this.state.successMessage === true) {
      message = (
        <>
        <Message color="green">
          Thank you for sharing your picture! Your post is sent for review and will soon be uploaded! Click on the map in the background to continue.
        </Message>
        <Button onClick={this.handleMessageVisibility('overlay')}>Close</Button>
        </>
      )
    }

    if (this.state.errorMessage === true && this.state.image.length === 0) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your post could not be created because of following error(s):</p>
            <ul>
              {this.state.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
              <li>You need to upload an image</li>
            </ul>
          </Message>
          <Button onClick={this.handleMessageVisibility('overlay')}>Close</Button>
        </>
      )
    }

    if (this.state.errorMessage === true && this.state.image.length !== 0) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your post could not be created because of following error(s):</p>
            <ul>
              {this.state.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
          <Button onClick={this.handleMessageVisibility('overlay')}>Close</Button>
        </>
      )
    }

    if (this.state.image.length === 0) {
      this.state.button = 'show-button'
    }

    const { activeItem } = this.state

    // let closeButton
    // if (this.state.messageVisible === true) {
    //   closeButton = (
    //     <Button onClick={this.handleMessageVisibility('overlay')}>Close</Button>
    //   )
    // }

    return (
      <>

        <Sidebar.Pushable as={Segment} textAlign='center'
          className={this.state.activeItem}>

          {/* <div id="close-button">
            {closeButton}
          </div> */}

          <TopSidebar
            message={message}
            visible={this.state.messageVisible}
          />

          <h3>Add a photo</h3>

          <Container>
            <ImageUploader
              buttonText={
                <div>
                  <p id="add-photo-headline">Add Image</p>
                  <Icon id="add-photo-icon" name="image outline" size="huge"></Icon>
                  <p id="add-photo-label">Maximum image file size: 5 MB, Accepted image types: JPG</p>
                </div>
              }
              buttonClassName={this.state.button}
              withLabel={false}
              withIcon={false}
              withPreview={true}
              singleImage={true}
              onChange={this.onImageDropHandler}
              imgExtension={['.jpg']}
              maxFileSize={5242880}
            />

            <Form size="mini" type='medium' id={this.state.form}>
              <Form.Input
                required
                id="caption"
                value={this.state.caption}
                onChange={this.onChangeHandler}
                placeholder="Write your caption here"
              />
            </Form>

            <p id="location">
              <Icon
                name='map marker alternate' />
              Södermalm, Swedenborgsgatan</p>
            <br></br>
            <Button.Group
              id={this.state.toggle}
              toggle={true}
              inverted={true}>
              <Button
                id='work'
                basic color='teal'
                active={activeItem === 'work'}
                value='work'
                onClick={this.handleChangeCategory}>
                WORK
          </Button>

              <Button
                id='play'
                basic color='yellow'
                active={activeItem === 'play'}
                value='play'
                onClick={this.handleChangeCategory}>
                PLAY
            </Button>
            </Button.Group>
            <br></br>
            <br></br>

            <Button id="upload-button" onClick={this.uploadPost}>MAP IT!</Button>
            <br></br>
            <br></br>
          </Container>

        </Sidebar.Pushable>
      </>
    )
  }
}

export default PostForm
