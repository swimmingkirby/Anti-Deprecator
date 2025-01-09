import deprecatedItemsData from '../deprecations.json';
import {DeprecatedItem, Deprecation, Data} from "../interfaces/deprecatedItemsInterface";
import {Extension, RangeSetBuilder, StateEffect, EditorState} from "@codemirror/state";
import {Decoration, EditorView, hoverTooltip, lineNumbers} from "@codemirror/view";
import {atomone} from '@uiw/codemirror-theme-atomone';
import {javascript} from "@codemirror/lang-javascript";
import {saveToStorage, loadFromStorage} from './jsonStorage';

const defaultData: Data = {
    items: [
        {id: 1, code: "C001", description: "Sample description 1", recommendation: "Recommendation 1"},
        {id: 2, code: "C002", description: "Sample description 2", recommendation: "Recommendation 2"},
    ],
};

const baseExtensions = [
    lineNumbers(),
    javascript({jsx: true}),
    atomone,
    EditorView.editable.of(false)
];

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const ParseCodeCreateHighlightDecoration = (value: string): Extension[] => {
    let deprecatedItems: Deprecation[] = loadFromStorage<Data>('myJsonData')?.items || defaultData.items;
    if (!value) return baseExtensions;

    let deprecationsFound: DeprecatedItem[] = [];
    const extensions: Extension[] = [javascript({jsx: true})];

    try {
        const deprecatedFuncs: string[] = deprecatedItems.map((item) => item.code)
            .sort((a, b) => b.length - a.length);

        const pattern = new RegExp(`\\b(${deprecatedFuncs.map(escapeRegex).join('|')})\\b`, 'gi');
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(value)) !== null) {
            if (match.index > value.length) break;
            
            const beforeMatch = value.substring(0, match.index);
            const line = beforeMatch.split('\n').length;
            const matchedItem = deprecatedItems.find(item => item.code === match![0]);
            
            if (matchedItem) {
                deprecationsFound.push({
                    code: match![0],
                    description: matchedItem.description,
                    recommendation: matchedItem.recommendation,
                    startChar: match.index,
                    endChar: match.index + match![0].length,
                    line
                });
            }
        }
    } catch (error) {
        console.error("Error parsing code:", error);
        return baseExtensions;
    }

    const builder = new RangeSetBuilder<Decoration>();
    deprecationsFound
        .filter(item => item.startChar < value.length && item.endChar <= value.length)
        .forEach(item => {
            builder.add(item.startChar, item.endChar, Decoration.mark({class: 'highlighted-text'}));
        });

    extensions.push(EditorView.decorations.of(builder.finish()));

    const hover = hoverTooltip((view, pos) => {
        const validDeprecations = deprecationsFound.filter(item => 
            item.startChar < value.length && item.endChar <= value.length);
            
        for (const item of validDeprecations) {
            if (pos >= item.startChar && pos <= item.endChar) {
                return {
                    pos: item.startChar,
                    end: item.endChar,
                    above: true,
                    create(view) {
                        const dom = document.createElement('div');
                        dom.style.backgroundColor = '#282c34';
                        dom.style.padding = '16px';
                        dom.style.border = '2px solid #61dafb';
                        dom.style.borderRadius = '8px';
                        dom.style.fontFamily = '"Source Code Pro", monospace';
                        dom.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        dom.style.color = '#abb2bf';
                        dom.style.boxSizing = 'border-box';
                        dom.style.width = '100%';
                        dom.style.maxWidth = '600px';

                        const deprecatedLabel = document.createElement('span');
                        deprecatedLabel.textContent = 'Deprecated: ';
                        deprecatedLabel.style.color = '#e06c75';
                        deprecatedLabel.style.fontWeight = 'bold';
                        deprecatedLabel.style.display = 'block';
                        dom.appendChild(deprecatedLabel);

                        const deprecatedText = document.createElement('span');
                        deprecatedText.textContent = item.code;
                        deprecatedText.style.color = '#d19a66';
                        deprecatedText.style.display = 'block';
                        dom.appendChild(deprecatedText);

                        const descriptionLabel = document.createElement('span');
                        descriptionLabel.textContent = 'Description: ';
                        descriptionLabel.style.color = '#61afef';
                        descriptionLabel.style.fontWeight = 'bold';
                        descriptionLabel.style.display = 'block';
                        dom.appendChild(descriptionLabel);

                        const descriptionText = document.createElement('span');
                        descriptionText.textContent = item.description;
                        descriptionText.style.color = '#abb2bf';
                        descriptionText.style.display = 'block';
                        dom.appendChild(descriptionText);

                        const recommendationLabel = document.createElement('span');
                        recommendationLabel.textContent = 'Recommendation: ';
                        recommendationLabel.style.color = '#98c379';
                        recommendationLabel.style.fontWeight = 'bold';
                        recommendationLabel.style.display = 'block';
                        dom.appendChild(recommendationLabel);

                        const recommendationText = document.createElement('span');
                        recommendationText.textContent = item.recommendation;
                        recommendationText.style.color = '#abb2bf';
                        recommendationText.style.display = 'block';
                        dom.appendChild(recommendationText);

                        const button1 = document.createElement('button');
                        button1.textContent = 'Replace';
                        button1.style.marginTop = '16px';
                        button1.style.background = '#61afef';
                        button1.style.border = 'none';
                        button1.style.borderRadius = '4px';
                        button1.style.color = '#ffffff';
                        button1.style.padding = '12px 24px';
                        button1.style.cursor = 'pointer';
                        button1.style.fontWeight = 'bold';
                        button1.style.transition = 'background-color 0.3s, box-shadow 0.3s';
                        button1.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';

                        button1.onmouseover = () => {
                            button1.style.background = '#528bff';
                            button1.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                        };
                        button1.onmouseout = () => {
                            button1.style.background = '#61afef';
                            button1.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
                        };

                        button1.onclick = () => {
                            try {
                                const transaction = view.state.update({
                                    changes: {
                                        from: item.startChar,
                                        to: item.endChar,
                                        insert: item.recommendation
                                    }
                                });
                                view.dispatch(transaction);
                                const updatedValue = view.state.doc.toString();
                                const updatedExtensions = ParseCodeCreateHighlightDecoration(updatedValue);
                                const effectInstance = StateEffect.reconfigure.of([...baseExtensions, ...updatedExtensions]);
                                view.dispatch({effects: [effectInstance]});
                            } catch (error) {
                                console.error("Error in button click handler:", error);
                            }
                        };
                        dom.appendChild(button1);
                        return {dom};
                    }
                };
            }
        }
        return null;
    });

    extensions.push(hover);
    return [...baseExtensions, ...extensions];
};