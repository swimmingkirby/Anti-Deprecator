import React, {useState} from 'react';
import './App.css';
import InputBox from './components/inputBox';
import OutputBox from './components/outputBox';
import DepTable from './components/DepTable';
import infoPage from './components/infoPage';
import {Tabs, Tab, Box} from '@mui/material';
import InfoPage from "./components/infoPage";

function App() {
    const [liveInput, setInputValue] = useState<string>('');
    const [inputValue2, setInputValue2] = useState<string>('');
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleSubmit = () => {
        setInputValue2(liveInput);  
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Anti-Deprecator v1</p>
            </header>
            <Box sx={{width: '100%'}}>
                {/* Tabs Component */}
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    centered
                    textColor="inherit"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#61dafb',
                        },
                    }}
                    sx={{
                        '& .MuiTab-root': {
                            color: '#abb2bf',
                            fontFamily: "'Source Code Pro', monospace",
                            fontWeight: 'bold',
                            '&.Mui-selected': {
                                color: '#61dafb',
                            },
                        },
                    }}
                >
                    <Tab label="Info" />
                    <Tab label="Editor" />
                    <Tab label="Data" />
                </Tabs>
                {/* Conditional Rendering for Tab Content */}
                {activeTab === 1 && (
                    <Box sx={{p: 2}}>
                        <div className="boxes">
                            <InputBox value={liveInput} onChange={setInputValue}/>
                            <OutputBox code={inputValue2}/>
                        </div>
                        <p style={{fontStyle: 'italic', color: '#fff', margin: 0}}>Press Ctrl + D to load a sample script</p>
                        <div className="submit">
                            <a href="#" className="myButton" onClick={handleSubmit}>Submit</a>
                        </div>
                    </Box>
                )}
                {activeTab === 2 && (
                    <Box sx={{p: 2}}>
                        <DepTable/>
                    </Box>
                )}
                {activeTab === 0 && (<Box sx={{p: 2}}>
                    <InfoPage/>
                </Box>)}
            </Box>
        </div>
    );
}

export default App;