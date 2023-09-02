import React from 'react';
import { toast } from 'react-toastify';
import { setGlobalState } from '../../state/store';

export class DocumentPictureInPicture extends React.Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    this.pipWindow = null;
  }

  async componentDidMount() {
    try {
      // eslint-disable-next-line no-undef
      this.pipWindow = await documentPictureInPicture.requestWindow();

      // wait for the window to be ready
      await new Promise((resolve) => {
        let attempts = 0;
        const interval = setInterval(() => {
          if (this.pipWindow.document.readyState === 'complete') {
            clearInterval(interval);
            resolve();
          } else {
            attempts++;
            if (attempts > 100) {
              clearInterval(interval);
              resolve();
            }
          }
        }, 100);
      });

      // set title
      this.pipWindow.document.title = 'OpenAudioMc | Voice PiP';

      // append all document styles to the pip window
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
          const style = document.createElement('style');

          style.textContent = cssRules;
          this.pipWindow.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement('link');

          link.rel = 'stylesheet';
          link.type = styleSheet.type;
          link.media = styleSheet.media;
          link.href = styleSheet.href;
          this.pipWindow.document.head.appendChild(link);
        }
      });

      this.post();
    } catch (e) {
      // summon toast
      console.error(e);
      setGlobalState({ settings: { voicePiPEnabled: false } });
      toast.error("Couldn't open a Picture-in-Picture window. This web page either doesn't have the required permissions or your browser isn't supported.", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }

  componentDidUpdate() {
    this.post();
  }

  componentWillUnmount() {
    // close the pip window
    if (this.pipWindow) {
      this.pipWindow.close();
    }
  }

  post() {
    if (!this.pipWindow) {
      // eslint-disable-next-line no-console
      console.error('pip window not ready yet');
      return;
    }
    // copy the html from the rev, and set it as the pip window's html
    const content = this.contentRef.current.innerHTML;
    this.pipWindow.document.body.innerHTML = content;
  }

  render() {
    return (
      <div className="pip" style={{ display: 'none' }}>
        <div className="pip__content" ref={this.contentRef}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
