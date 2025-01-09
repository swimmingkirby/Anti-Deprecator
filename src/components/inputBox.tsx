import React, {useState, useCallback, useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {Extension} from '@codemirror/state';
import {atomone} from '@uiw/codemirror-theme-atomone';

const dummyJS = `
// Dummy JavaScript file with deprecated Dynamics 365 XRM functions

// Using Xrm.Page and deprecated context methods
console.log("Deprecated: ", Xrm.Page.context.getQueryStringParameters());
console.log("Deprecated: ", Xrm.Page.context.getTimeZoneOffsetMinutes());
console.log("Deprecated: ", Xrm.Page.context.getUserId());
console.log("Deprecated: ", Xrm.Page.context.getUserLcid());
console.log("Deprecated: ", Xrm.Page.context.getUserName());
console.log("Deprecated: ", Xrm.Page.context.getUserRoles());
console.log("Deprecated: ", Xrm.Page.context.getIsAutoSaveEnabled());
console.log("Deprecated: ", Xrm.Page.context.getOrgLcid());
console.log("Deprecated: ", Xrm.Page.context.getOrgUniqueName());

// Deprecated form attribute access
let attribute = Xrm.Page.getAttribute("sample_attribute");
attribute.setValue("New Value");

// Deprecated form control access
let control = Xrm.Page.getControl("sample_control");
control.setVisible(false);

// Deprecated form type access
console.log("Deprecated: Form Type:", Xrm.Page.ui.getFormType());

// Deprecated form notifications
Xrm.Page.ui.setFormNotification("This is a deprecated notification.", "INFO", "1");
Xrm.Page.ui.clearFormNotification("1");

// Deprecated ribbon refresh
Xrm.Page.ui.refreshRibbon();

// Deprecated entity data methods
let dataXml = Xrm.Page.data.entity.getDataXml();
console.log("Deprecated Data XML:", dataXml);

// Deprecated Mobile Offline
let offlineData = Xrm.Mobile.offline.retrieveMultipleRecords("sampleEntity");
console.log("Deprecated Offline Data:", offlineData);

// Deprecated GridRow and GridRowData
let gridRow = someGridControl.getGrid().getRows().get(0);
let gridData = gridRow.getData();
let entity = gridData.getEntity();
console.log("Deprecated Grid Data Entity:", entity);

// Deprecated Key Press Handlers
let controlWithKeyPress = Xrm.Page.getControl("sample_control_with_keypress");
controlWithKeyPress.addOnKeyPress(function () {
    console.log("Deprecated Key Press Event");
});
controlWithKeyPress.fireOnKeyPress();
controlWithKeyPress.removeOnKeyPress(function () {});

// Deprecated Autocomplete
control.showAutoComplete([{ text: "Option 1" }]);
control.hideAutoComplete();

// Deprecated Dialog Methods
Xrm.Utility.alertDialog("Deprecated Alert Dialog");
Xrm.Utility.confirmDialog("Deprecated Confirm Dialog");

// Deprecated Device Methods
let barcodeValue = Xrm.Utility.getBarcodeValue();
console.log("Deprecated Barcode Value:", barcodeValue);

let position = Xrm.Utility.getCurrentPosition();
console.log("Deprecated Position:", position);

// Deprecated Entity Metadata Method
let isActivity = Xrm.Utility.isActivityType("sampleEntity");
console.log("Deprecated Activity Check:", isActivity);

// Deprecated Navigation Methods
Xrm.Utility.openEntityForm("sampleEntity", "12345");
Xrm.Utility.openQuickCreate("sampleEntity");
Xrm.Utility.openWebResource("webResourceName");

// Deprecated Silverlight Web Resources
try {
    let silverlightData = getData("sample_silverlight");
    console.log("Deprecated Silverlight Data:", silverlightData);
} catch (err) {
    console.error("Silverlight is no longer supported.");
}

// Deprecated Organization Settings
console.log("Deprecated Base Currency ID:", globalContext.organizationSettings.baseCurrencyId);

// Deprecated Save Method
Xrm.Page.data.entity.save();

// Deprecated Window Object Access
let parentXrm = parent.Xrm;
console.log("Deprecated Parent XRM:", parentXrm);

// Deprecated Object Handling
let contentWindow = getObject("sampleObject");
console.log("Deprecated Object Access:", contentWindow);

// Deprecated Methods for roles, currencies
console.log("Deprecated Security Roles:", globalContext.userSettings.securityRoles);
console.log("Deprecated Transaction Currency:", globalContext.userSettings.transactionCurrencyId);
`;

interface InputBoxProps {
    value: string;
    onChange: (value: string) => void; 
}

const InputBox: React.FC<InputBoxProps> = ({value, onChange}) => {
    const onChangeCallback = useCallback((val: string, viewUpdate: any) => {
        onChange(val); 
    }, [onChange]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'd') {
                event.preventDefault();
                onChange(dummyJS);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onChange]);

    return (
        <CodeMirror
            value={value}
            theme={atomone}
            height='100%'
            extensions={[javascript({jsx: true}) as Extension]}
            onChange={onChangeCallback} 
        />
       
    );
}

export default InputBox;