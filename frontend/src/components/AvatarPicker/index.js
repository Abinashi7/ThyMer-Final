import React, { Component } from "react";
import MainAvatar from "./MainAvatar";
import Popover from "./Popover";
import Proptypes from "prop-types";
import "./avatar-picker-styles/avatar-picker.css";

class AvatarPicker extends Component {
  static propTypes = {
    avatarList: Proptypes.arrayOf(Proptypes.object.isRequired)
  };

  constructor(props) {
    super(props)
    this.state = {
      isAvatarPickerOpen: false,
      currentAvatar:props.avatarList[this.props.value],
      scaleOutClass: ""
    };
  }


  static getDerivedStateFromProps(props, state) {

    if (props.avatarList[props.value] !== state.currentAvatar) {
      return {
        currentAvatar:props.avatarList[props.value]
      };
    }
    return null;
  }

  componentWillReceiveProps() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  beginScaleOutAnimation = () => {
    return new Promise(resolve => {
      this.setState({ scaleOutClass: "Scale-out" });
      setTimeout(() => resolve(), 200);
    });
  };

  closeAvatarPicker = index => {
    const avatarList = this.props.avatarList;
    const onChange = this.props.onChange;
    const name = this.props.name

    Promise.resolve("Start")
      .then(this.beginScaleOutAnimation)
      .then(() => {
        this.setState({
          isAvatarPickerOpen: false,
          currentAvatar: avatarList[index],
          scaleOutClass: ""
        })
        let value = index.toString()
        onChange(null, {name, value})
      }
        
      )
     // .then(() => avatarList.unshift(avatarList.splice(index, 1)[0]));
  };

  handleClickOutside = event => {
    if (
      this.state.isAvatarPickerOpen &&
      this.popover &&
      !this.popover.contains(event.target)
    ) {
      Promise.resolve("Start")
        .then(this.beginScaleOutAnimation)
        .then(() =>
          this.setState({ isAvatarPickerOpen: false, scaleOutClass: "" })
        );
    }
  };

  handleMainAvatarClick = () => this.setState({ isAvatarPickerOpen: true });

  render() {
    const { avatarList } = this.props;
    const { isAvatarPickerOpen, currentAvatar, scaleOutClass } = this.state;
    return (
      <div
        className={"Avatar-picker-container"}
        ref={ref => (this.popover = ref)}
      >
        <MainAvatar
          handleClick={this.handleMainAvatarClick}
          currentAvatar={currentAvatar}
        />
        {isAvatarPickerOpen && (
          <Popover
            avatarList={avatarList}
            closeAvatarPicker={this.closeAvatarPicker}
            scaleOutClass={scaleOutClass}
          />
        )}
      </div>
    );
  }
}

export default AvatarPicker;
