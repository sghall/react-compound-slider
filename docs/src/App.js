import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="nav has-shadow" id="top">
          <div className="container">
            <div className="nav-left">
              <a className="nav-item" href="../index.html">
                <img src="../images/bulma.png" alt="Description" />
              </a>
              <p className="control has-addons searchbox">
                <input className="input" type="text" placeholder="Search videotube..." />
                <a className="button is-dark">&nbsp;<i className="fa fa-search" />&nbsp;</a>
              </p>
            </div>
            <span className="nav-toggle">
              <span />
              <span />
              <span />
            </span>
            <div className="nav-right nav-menu">
              <span className="nav-item">
                <a className="button is-default is-bold">
                  Upload
                </a>
              </span>
              <a className="nav-item is-tab">
                <i className="fa fa-bell-o" />
              </a>
              <a className="nav-item is-tab">
                <img src="https://placehold.it/64x64" alt="foo" className="avatar-photo" />
              </a>
            </div>
          </div>
        </nav>
        <div className="spacer" />
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <div className="image">
                <img src="https://placehold.it/800x500" alt="foo" />
              </div>
              <br />
              <div className="box video-meta">
                <div className="video-title">A video title would go here</div>
                <br />
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src="http://placehold.it/128x128" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <div className="columns">
                        <div className="column is-6">
                          <p>
                            <strong>jsmith</strong>
                            <br />
                            <a href="subscribe" className="button is-danger">Subscribe</a>
                          </p>
                        </div>
                        <div className="column is-6">
                          <nav className="nav">
                            <div className="container">
                              <div className="nav-right">
                                <a className="nav-item is-tab is-active">
                                  <span className="title is-4">124 304 views</span>
                                </a>
                              </div>
                            </div>
                          </nav>
                        </div>
                      </div>
                      <nav className="level">
                        <p className="level-item has-text-left">
                          <a className="button is-default">
                            <span className="icon"><i className="fa fa-plus" /></span> <span>Add to</span>
                          </a>
                          <a className="button is-default">
                            <span className="icon"><i className="fa fa-share" /></span> <span>Share</span>
                          </a>
                          <a className="button is-default">
                            <span className="icon"><i className="fa fa-ellipsis-h" /></span> <span>More</span>
                          </a>
                        </p>
                        <p className="level-item has-text-right">
                          <a className="button is-default"><i className="fa fa-thumbs-up" /> 5254</a>
                          <a className="button is-default"><i className="fa fa-thumbs-down" /> 1</a>
                        </p>
                      </nav>
                    </div>
                  </div>
                </article>
              </div>
              <div className="box video-description">
                <p><strong>Uploaded on August 1, 2016</strong></p>
                <p>Lorum ipsum and friends at MTV unplugged playing Long May You Run.</p>
                <hr />
                <p className="has-text-centered has-text-muted video-description-more">Show More</p>
              </div>
              <div className="box">
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="foo" src="http://placehold.it/128x128" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <p className="control">
                      <textarea className="textarea" placeholder="Add a comment..." />
                    </p>
                    <nav className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <a className="button is-info">Post comment</a>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <label className="checkbox">
                            <input type="checkbox" /> Press enter to submit
                          </label>
                        </div>
                      </div>
                    </nav>
                  </div>
                </article>
                <hr />
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="foo" src="http://placehold.it/128x128" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>Barbara Middleton</strong> <small> · 3 hrs</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a></small>
                      </p>
                    </div>
                  </div>
                </article>
                <div className="spacer" />
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="foo" src="http://placehold.it/128x128" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>Barbara Middleton</strong> <small> · 3 hrs</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a></small>
                      </p>
                    </div>
                  </div>
                </article>
                <div className="spacer" />
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="foo" src="http://placehold.it/128x128" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>Barbara Middleton</strong> <small> · 3 hrs</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a></small>
                      </p>
                    </div>
                  </div>
                </article>
                <div className="spacer" />
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="foo" src="http://placehold.it/128x128" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>Barbara Middleton</strong> <small> · 3 hrs</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a></small>
                      </p>
                    </div>
                  </div>
                </article>
                <div className="spacer" />
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="foo" src="http://placehold.it/128x128" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>Barbara Middleton</strong> <small> · 3 hrs</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a></small>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className="column is-4">
              <div className="box related-list">
                <p className="autoplay">
                  <span className="autoplay-title">Up next</span>
                  <span className="autoplay-toggle">
                    Autoplay
                    <i className="fa fa-info-circle" />
                  </span>
                </p>
                <article className="media related-card">
                  <div className="media-left">
                    <figure className="image">
                      <img src="http://placehold.it/120x90" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <span className="video-title">A video title</span>
                        <span className="video-account">asasdas</span>
                        <span className="video-views">239 views</span>
                      </p>
                    </div>
                  </div>
                </article>
                <hr />
                <article className="media related-card">
                  <div className="media-left">
                    <figure className="image">
                      <img src="http://placehold.it/120x90" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <span className="video-title">A video title</span>
                        <span className="video-account">asasdas</span>
                        <span className="video-views">239 views</span>
                      </p>
                    </div>
                  </div>
                </article>
                <article className="media related-card">
                  <div className="media-left">
                    <figure className="image">
                      <img src="http://placehold.it/120x90" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <span className="video-title">A video title</span>
                        <span className="video-account">asasdas</span>
                        <span className="video-views">239 views</span>
                      </p>
                    </div>
                  </div>
                </article>
                <article className="media related-card">
                  <div className="media-left">
                    <figure className="image">
                      <img src="http://placehold.it/120x90" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <span className="video-title">A video title</span>
                        <span className="video-account">asasdas</span>
                        <span className="video-views">239 views</span>
                      </p>
                    </div>
                  </div>
                </article>
                <article className="media related-card">
                  <div className="media-left">
                    <figure className="image">
                      <img src="http://placehold.it/120x90" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <span className="video-title">A video title</span>
                        <span className="video-account">asasdas</span>
                        <span className="video-views">239 views</span>
                      </p>
                    </div>
                  </div>
                </article>
                <article className="media related-card">
                  <div className="media-left">
                    <figure className="image">
                      <img src="http://placehold.it/120x90" alt="foo" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <span className="video-title">A video title</span>
                        <span className="video-account">asasdas</span>
                        <span className="video-views">239 views</span>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
