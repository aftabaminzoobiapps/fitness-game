import React, {useState, useEffect, useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import { AppState } from 'react-native'

function SoundController(props) {
  const sound = useSelector(({sound}) => sound.sound);
  const music = useSelector(({sound}) => sound.music);
  const soundMute = useSelector(({sound}) => sound.soundMute);
  const musicMute = useSelector(({sound}) => sound.musicMute);

  const [loaded,setLoaded]=useState(false);

  const dispatch = useDispatch();
  const soundCallbacks = useRef([]);
  const musicCallbacks = useRef([]);

  const muteRef = React.useRef(musicMute);
  const musiRef = React.useRef(music);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
      AppState.addEventListener("change", _handleAppStateChange);

      return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
      };
    }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if(musicCallbacks.current[musiRef.current])
      if(muteRef.current)
        musicCallbacks.current[musiRef.current].play();
      // console.log("App has come to the foreground!");
    }

    if (
      appState.current.match(/active/) &&
      nextAppState.match(/inactive|background/)
    ) {
      if(musicCallbacks.current[musiRef.current])
        musicCallbacks.current[musiRef.current].pause();
      // console.log("App has come to the background!");
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log("AppState", appState.current);
  };

  function handlePress()
  {
      soundCallbacks.current["decrease"].stop(() => {
              soundCallbacks.current["decrease"].play();
          });
  }

  useEffect(() => {
    soundCallbacks.current["increase"]= new Sound('increase.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["mission"]= new Sound('mission.wav', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });

    soundCallbacks.current["decrease"]= new Sound('decrease.wav', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });

    soundCallbacks.current["missionend"]= new Sound('missionend.wav', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["popup"]= new Sound('popup.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["popupopen"]= new Sound('popupopen.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["win"]= new Sound('win.wav', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
    musicCallbacks.current["music"]= new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed /to load the sound', error);
            return;
          }
          setLoaded(true);
        });
  },[]);

  useEffect(() => {
    if(soundMute){
      if(sound!='')
        soundCallbacks.current[sound].stop(() => {
              soundCallbacks.current[sound].play();
          });
    }
  },[sound]);

  useEffect(() => {
    muteRef.current = musicMute;
    if(!musicMute)
    for (let key in musicCallbacks.current) {
      musicCallbacks.current[key].stop();
    }
    else {
      if(music!='')
        musicCallbacks.current[music].stop(() => {
              musicCallbacks.current[music].setNumberOfLoops(-1);
              // if(appState.current.match(/inactive|background/))
              //   musicCallbacks.current[music].pause();
              // else
                musicCallbacks.current[music].play();
          });
    }
  },[musicMute]);

  useEffect(() => {
    musiRef.current=music;
    if(!musicMute)
    {

      for (let key in musicCallbacks.current) {
        musicCallbacks.current[key].stop();
      }
    }
    else {

      if(music!='')
        musicCallbacks.current[music].stop(() => {
              musicCallbacks.current[music].setNumberOfLoops(-1);
              // if(appState.current.match(/inactive|background/))
              //   musicCallbacks.current[music].pause();
              // else
                musicCallbacks.current[music].play();
          });
      else {
        for (let key in musicCallbacks.current) {
          musicCallbacks.current[key].stop();
        }
    }


    }
    return () => {
      for (let key in musicCallbacks.current) {
        musicCallbacks.current[key].stop();
      }
    }
  },[music,loaded]);

  return(
    <></>
  );
}

export default SoundController;
