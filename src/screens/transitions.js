import { TransitionSpecs, HeaderStyleInterpolators,TransitionPresets   } from '@react-navigation/stack';
import { BackHandler, Animated,View } from 'react-native';

export const RightTransition = {
  gestureDirection: 'horizontal-inverted',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, inverted, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX:current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            })
          },
          // {
          //   rotate: current.progress.interpolate({
          //     inputRange: [0, 0],
          //     outputRange: [0, 0],
          //   }),
          // },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, .8],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export const LeftTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, inverted, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
            inverted),
          },
          // {
          //   rotate: current.progress.interpolate({
          //     inputRange: [0, 0],
          //     outputRange: [0, 0],
          //   }),
          // },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, .8],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export const UpTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, inverted, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: Animated.multiply(current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
            inverted),
          },

          // {
          //   rotate: current.progress.interpolate({
          //     inputRange: [0, 0],
          //     outputRange: [0, 0],
          //   }),
          // },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, .6],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};
