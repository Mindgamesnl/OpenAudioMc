import React from 'react';
import {OaStyleCard} from "../../components/card/OaStyleCard";
import {BlackoutPage} from "../../components/layout/BlackoutPage";
import Webcam from 'react-webcam';
import cv from '@techstark/opencv-js'

export class TokenScannerView extends React.Component {

    constructor(props) {
        super(props);
        this.webcamRef = React.createRef();
    }

    capture = () => {
        alert("Capturing")
        const imageSrc = this.webcamRef.current.getScreenshot();
        const imageElement = document.createElement('img');

        imageElement.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const srcMat = cv.matFromImageData(imageData);

            // Perform image processing tasks using OpenCV.js

            srcMat.delete(); // Clean up the memory
        };

        imageElement.src = imageSrc;
    };


    render() {
    return (
        <BlackoutPage coverImage={"assets/login-background.png"}>
          <div className="py-12">
            <OaStyleCard title={"Scan login code"} isDanger={false} fullWidth={true}>
                <img ref={this.imageRef} alt={"Camera"} style={{width: "100%"}}/>
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
