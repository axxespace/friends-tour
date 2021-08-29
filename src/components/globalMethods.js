import {useRef, useEffect} from "react";

export const UsePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export const AddScrollHandler = (scrollHandler) => {
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [scrollHandler]);
}
