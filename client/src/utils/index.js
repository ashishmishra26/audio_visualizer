export const getUserAudioInput = () => {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
};

export const stopUserAudioInput = (audioInput) => {
  audioInput.getTracks().forEach(track => track.stop());
};