import React from 'react';
import {OaStyleCard} from "../../components/card/OaStyleCard";
import {BlackoutPage} from "../../components/layout/BlackoutPage";
import Webcam from 'react-webcam';

export class TokenScannerView extends React.Component {

    constructor(props) {
        super(props);
        this.webcamRef = React.createRef();
    }

    capture = () => {
        const imageSrc = this.webcamRef.current.getScreenshot();
        // Handle the captured image as needed
    }

  render() {
    return (
        <BlackoutPage coverImage={"assets/login-background.png"}>
          <div className="py-12">
            <OaStyleCard title={"Scan login code"} isDanger={false} fullWidth={true}>
                <Webcam
                    audio={false}
                    videoConstraints={{
                        facingMode: 'environment',
                    }}
                    ref={this.webcamRef}
                />
                <button onClick={this.capture}>Capture</button>
            </OaStyleCard>
          </div>
        </BlackoutPage>
    );
  }
}
