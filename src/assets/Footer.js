import React from 'react';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton, RedditShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faPinterest, faReddit, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="share-buttons">
      <FacebookShareButton url={window.location.href}>
        <FontAwesomeIcon icon={faFacebookF} size="lg" />
         <p>Share on Facebook</p>
      </FacebookShareButton>

      <TwitterShareButton url={window.location.href}>
        <FontAwesomeIcon icon={faTwitter} size="lg" />
          <p>Share on Twitter</p>
      </TwitterShareButton>

      <PinterestShareButton url={window.location.href}>
        <FontAwesomeIcon icon={faPinterest} size="lg" />
          <p>Share on Pinterest</p>
      </PinterestShareButton>

      <RedditShareButton url={window.location.href}>
        <FontAwesomeIcon icon={faReddit} size="lg" />
          <p>Share on Reddit</p>
      </RedditShareButton>

      <a
        href={`https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}&caption=Your%20Caption%20Here`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} size="lg" />
        <p>Share on Instagram</p>
      </a>
      
      {/* Add more share buttons as needed */}
    </div>
  );
}

export default Footer;
