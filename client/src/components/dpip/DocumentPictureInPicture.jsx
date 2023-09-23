import React from 'react';
import { toast } from 'react-toastify';
import { setGlobalState } from '../../state/store';

export class DocumentPictureInPicture extends React.Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    this.pipWindow = null;
    this.updateTask = null;
    this.latestContentHash = null;
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
      // eslint-disable-next-line no-console
      console.error(e);
      setGlobalState({ settings: { voicePiPEnabled: false } });
      toast.error("Couldn't open a Picture-in-Picture window. This web page either doesn't have the required permissions or your browser isn't supported.", {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    // update the content every 500ms
    this.updateTask = setInterval(() => {
      this.updateContent();
    }, 50);
  }

  componentDidUpdate() {
    this.post();
  }

  componentWillUnmount() {
    // close the pip window
    if (this.pipWindow) {
      this.pipWindow.close();
    }

    if (this.updateTask) {
      clearInterval(this.updateTask);
    }
  }

  updateContent() {
    // is the ref applied?
    if (!this.contentRef.current) return;
    // is the window ready?
    if (!this.pipWindow) return;

    // generate a unique string based on the content which is quick to compare
    // we can do this by counting the total spaces and quotes in the content
    const content = this.contentRef.current.innerHTML;
    const hash = content.split(' ').length + content.split('"').length;
    // is the hash different?
    if (hash !== this.latestContentHash) {
      // update the hash
      this.latestContentHash = hash;
      // post the content
      this.post();
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
