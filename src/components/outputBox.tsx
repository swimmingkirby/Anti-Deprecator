import React, {useState, useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {atomone} from '@uiw/codemirror-theme-atomone';
import {Extension} from '@codemirror/state';
import {ParseCodeCreateHighlightDecoration} from '../logic/deprecationLogic';

interface OutputBoxProps {
    code: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({code}) => {
    const [extensions, setExtensions] = useState<Extension[]>([]);

    useEffect(() => {
        if (code) {
            const newExtensions = ParseCodeCreateHighlightDecoration(code);
            setExtensions(newExtensions);
        }
    }, [code]);

    return (
        <CodeMirror
            value={code}
            theme={atomone}
            height='100%'
            readOnly={true}
            extensions={extensions}
            key={`${code.length}-${code}`} 
        />
    );
};

export default OutputBox;