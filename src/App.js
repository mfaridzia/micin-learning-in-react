import React, { useState } from 'react';
import * as ml5 from 'ml5';

export default function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [predictionLabel, setPredictionLabel] = useState('');
  const [predictionConfidence, setPredictionConfidence] = useState('');
  const [predicted, setPredicted] = useState(false);

  const loadImage = (e) => {
    const img = e.target.files[0];
    setImageUrl(window.URL.createObjectURL(img));
  }

  const classifyImage = async () => {
    const classifier = await ml5.imageClassifier('MobileNet');
    const img = document.getElementById('image');
    classifier.predict(img, 5, (err, result) => {
      setPredictionLabel(result[0].label)
      setPredictionConfidence(result[0].confidence)
      setPredicted(true);
    })
  }

  return (
    <>
      <center>
        <h1> Image Classification in JS </h1>
        <input type="file" accept="image/*" onChange={loadImage} />
        { 
          imageUrl && 
          <div>
            <img id="image" src={imageUrl} alt="images" height={500} /> <br />
            <button onClick={classifyImage}>Classify Image</button>
          </div>
        }
        {
          predicted &&
          <p> Aplikasi memprediksi {predictionConfidence * 100}% gambar ini adalah {predictionLabel.split(",")[0]} </p>
        }
      </center>
    </>
  );
}
