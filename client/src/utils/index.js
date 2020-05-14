export const getUserAudioInput = () => {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
};

export const stopUserAudioInput = (audioInput) => {
  audioInput.getTracks().forEach(track => track.stop());
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}