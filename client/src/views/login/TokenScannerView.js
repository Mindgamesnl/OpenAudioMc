import React from 'react';
import {OaStyleCard} from "../../components/card/OaStyleCard";
import {BlackoutPage} from "../../components/layout/BlackoutPage";
import Webcam from 'react-webcam';
import cv from "@techstark/opencv-js"

export class TokenScannerView extends React.Component {

    constructor(props) {
        super(props);
        this.webcamRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.startProcessing();
    }

    componentWillUnmount() {
        this.stopProcessing();
    }

    startProcessing = () => {
        const webcam = this.webcamRef.current.video;
        const canvas = this.canvasRef.current;

        const processFrame = () => {
            // Get the current frame from the webcam
            const frame = new cv.Mat(webcam.height, webcam.width, cv.CV_8UC4);
            const context = canvas.getContext('2d');
            context.drawImage(webcam, 0, 0, webcam.width, webcam.height);
            const imageData = context.getImageData(0, 0, webcam.width, webcam.height);
            frame.data.set(imageData.data);

            // Preprocessing
            const gray = new cv.Mat();
            cv.cvtColor(frame, gray, cv.COLOR_RGBA2GRAY);

            // Edge Detection
            const edges = new cv.Mat();
            cv.Canny(gray, edges, 50, 150);

            // Display debug data
            cv.imshow(canvas, edges);

            // Request next frame processing
            requestAnimationFrame(processFrame);
        };

        // Start processing frames
        requestAnimationFrame(processFrame);
    };

    stopProcessing = () => {
        // Stop processing frames
        cancelAnimationFrame(this.processFrameId);
    };


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