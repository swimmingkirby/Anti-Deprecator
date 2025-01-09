import React from 'react';
import '../App.css'; 
import logo from '../logo.svg';

const InfoPage = () => {
    return (
        <div style={{maxWidth: '800px', margin: '2rem auto', fontFamily: 'Source Code Pro, monospace', color: '#fff'}}>
            <div style={{
                padding: '2rem',
                backgroundColor: '#1c2129',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.5)'
            }}>
                <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                    <h1 style={{color: '#61dafb', margin: '0 0 0.5rem'}}>Anti-Deprecator</h1>
                    <p style={{fontStyle: 'italic', color: '#fff', margin: 0}}>
                        "Companion for Tackling Deprecated Code"
                    </p>
                </div>

                <hr style={{border: '1px solid #464f5f', marginBottom: '1.5rem'}}/>

                <div>
                    <h2 style={{marginBottom: '1rem', color: '#61afef'}}>
                        <span style={{verticalAlign: 'middle', marginRight: '0.5rem'}}>ℹ️</span>
                        What is Anti-Deprecator?
                    </h2>
                    <p style={{lineHeight: '1.8'}}>
                    The Anti-Deprecator is a developer tool that identifies and replaces deprecated code in JavaScript projects, with a focus on Dynamics 365 JS webresources. Built with React, it offers syntax highlighting, replacement suggestions, and configurable settings to help maintain modern, up-to-date code.
                    </p>
                </div>

                <hr style={{border: '1px solid #464f5f', margin: '1.5rem 0'}}/>

                <div>
                    <h2 style={{marginBottom: '1rem', color: '#61afef'}}>
                        <span style={{verticalAlign: 'middle', marginRight: '0.5rem'}}>🚀</span>
                        Get Started Now
                    </h2>
                    <p style={{lineHeight: '1.8'}}>
                        Ready to dive in? Follow these steps to get started with Anti-Deprecator:
                    </p>
                    <ol style={{paddingLeft: '1rem'}}>
                        <li style={{marginBottom: '0.5rem'}}>Navigate to the 'Editor' Tab: Input your JavaScript code in the editor.</li>
                        <li style={{marginBottom: '0.5rem'}}>Press <strong>Ctrl + D</strong> to load a sample script with deprecated functions.</li>
                        <li style={{marginBottom: '0.5rem'}}>Click 'Submit': Process the input code to identify deprecated items.</li>
                        <li style={{marginBottom: '0.5rem'}}>Hover Over Highlights: View detailed information and apply fixes directly from the tooltip.</li>
                    </ol>
                </div>

                <hr style={{border: '1px solid #464f5f', margin: '1.5rem 0'}}/>

                <div>
                    <h2 style={{marginBottom: '1rem', color: '#61afef'}}>
                        <span style={{verticalAlign: 'middle', marginRight: '0.5rem'}}>💻</span>
                        Key Features
                    </h2>
                    <ul style={{paddingLeft: '1rem'}}>
                        <li style={{marginBottom: '0.5rem'}}>⚡ Dynamic Code Parsing: Highlight deprecated elements with
                            precise recommendations.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>🖍 Interactive Tooltip: Hover over deprecated elements to
                            view details and recommendations.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>📄 Data Management: Add, remove, or modify deprecated items
                            dynamically.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>💫 Real-Time Editor: Seamless integration with CodeMirror
                            for code editing and visualization.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>💾 Persistent Storage: Save custom data to localStorage for
                            future sessions.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>⚙️ Configurability: Customize the tool's deprecations to fit your project's unique needs.
                        </li>
                    </ul>
                </div>

                <hr style={{border: '1px solid #464f5f', margin: '1.5rem 0'}}/>

                <div>
                    <h2 style={{marginBottom: '1rem', color: '#61afef'}}>
                        <span style={{verticalAlign: 'middle', marginRight: '0.5rem'}}>🔧</span>
                        How to Use
                    </h2>
                    <ol style={{paddingLeft: '1rem'}}>
                        <li style={{marginBottom: '0.5rem'}}>Navigate to the 'Editor' Tab: Input your JavaScript code in
                            the editor.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Click 'Submit': Process the input code to identify
                            deprecated items.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Hover Over Highlights: View detailed information and apply
                            fixes directly from the tooltip.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Manage Data: Add or edit deprecated items in the 'Data'
                            tab.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Explore Deprecated Items: Explore the 'Info' tab for
                            detailed explanations about each feature.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Save Changes: Ensure your data is saved to localStorage for
                            future use.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Update Deprecated Data: In the 'Data' tab, review and
                            update the JSON data for deprecated elements.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Use Replacement Suggestions: Click on suggested
                            replacements to auto-correct code in the editor.
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Review Outputs: Review processed code outputs in the
                            OutputBox to verify corrections.
                        </li>
                    </ol>
                </div>

                <hr style={{border: '1px solid #464f5f', margin: '1.5rem 0'}}/>

                <div style={{textAlign: 'center'}}>
                    <p style={{margin: 0}}>
                        For more details, visit our <a href="#" style={{color: '#61dafb'}}>GitHub Repository</a>.
                    </p>
                </div>

                <hr style={{border: '1px solid #464f5f', margin: '1.5rem 0'}}/>

                <div style={{textAlign: 'center'}}>
                    <img src={logo} alt="React Logo" style={{height: '40px', marginBottom: '10px'}} />
                    <p style={{margin: 0, color: '#61dafb'}}>Built with React</p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;