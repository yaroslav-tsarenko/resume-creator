declare module 'react-avatar-editor' {
    import * as React from 'react';

    export interface AvatarEditorProps {
        image: string | File;
        width: number;
        height: number;
        border?: number;
        scale?: number;
        rotate?: number;
        borderRadius?: number;
        color?: [number, number, number, number];
        className?: string;
        style?: React.CSSProperties;
    }

    export default class AvatarEditor extends React.Component<AvatarEditorProps> {
        getImage(): HTMLCanvasElement;
        getImageScaledToCanvas(): HTMLCanvasElement;
    }
}
