import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
declare type AnimFinishEvent = Readonly<{}>;
declare type AnimationProp = {
    duration?: Int32;
    timingFunction?: string;
};
declare type HoleProp = {
    height: Int32;
    width: Int32;
    x: Int32;
    y: Int32;
    borderRadius?: Int32;
    isRTL?: boolean;
    borderTopLeftRadius?: Int32;
    borderTopRightRadius?: Int32;
    borderBottomLeftRadius?: Int32;
    borderBottomRightRadius?: Int32;
    borderTopStartRadius?: Int32;
    borderTopEndRadius?: Int32;
    borderBottomStartRadius?: Int32;
    borderBottomEndRadius?: Int32;
};
export interface NativeProps extends ViewProps {
    holes?: ReadonlyArray<Readonly<HoleProp>>;
    animation?: Readonly<AnimationProp>;
    onAnimationFinished?: DirectEventHandler<AnimFinishEvent>;
}
declare const _default: HostComponent<NativeProps>;
export default _default;
