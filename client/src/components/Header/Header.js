import React from 'react';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import './Header.css';

const socialMap = [{
  icon: <GitHubIcon />,
  link: 'https://github.com/ashishmishra26/audio_visualizer'
}, {
  icon: <LinkedInIcon />,
  link: 'https://www.linkedin.com/in/ashishmishra26/'
}, {
  icon: <InstagramIcon />,
  link: 'https://www.instagram.com/ashish.io/'
}]

const SocialJSX = socialMap.map((platform, idx) => {
  return (
    <a
      className="social-link"
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={idx + 1}
      key={platform.link}
    >
      {platform.icon}
    </a>
  )
});

export default function Header(props) {
  return (
    <div className="header">
      <div className="switch-wrapper">
        <button 
          type="button"
          tabIndex="0"
          className="play-btn"
          onClick={props.toggleMicrophone}  
        >
          {props.audioInput ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
      </div>
      <div className="social-wrapper">
        {SocialJSX}
      </div>
    </div>
  )
}
