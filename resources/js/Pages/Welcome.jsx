import { Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const result = document.getElementById("result");

    const scan = () => {
        const scanner = new jscanify();
        const canvasCtx = canvas.getContext("2d");
        const resultCtx = result.getContext("2d");

        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: "environment", // 'environment' para la cámara trasera, 'user' para la cámara frontal
                },
            })
            .then((stream) => {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    result.width = video.videoWidth;
                    result.height = video.videoHeight;

                    console.log(video.videoWidth, video.videoHeight);
                    setInterval(() => {
                        canvasCtx.drawImage(
                            video,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );
                        const resultCanvas = scanner.highlightPaper(canvas);
                        resultCtx.drawImage(
                            resultCanvas,
                            0,
                            0,
                            result.width,
                            result.height
                        );
                    }, 10);
                };
            });
    };
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <button
                        className="bg-white scale-100 rounded-lg"
                        onClick={scan}
                    >
                        Start camera
                    </button>
                    {!video && (
                        <video id="video" width="300px" height="300px"></video>
                    )}
                    <canvas id="canvas" width="300px" height="300px"></canvas>
                    <canvas id="result" width="300px" height="300px"></canvas>
                </div>
            </div>
        </>
    );
}
