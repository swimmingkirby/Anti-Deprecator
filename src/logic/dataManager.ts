import {saveToStorage, loadFromStorage} from './jsonStorage';

type Item = {
    id: number;
    code: string;
    description: string;
    recommendation: string;
};

type Data = {
    items: Item[];
};

const defaultData: Data = {
    items: [
        {id: 1, code: "C001", description: "Sample description 1", recommendation: "Recommendation 1"},
        {id: 2, code: "C002", description: "Sample description 2", recommendation: "Recommendation 2"},
    ],
};

export const initializeData = (): Data => {
    return loadFromStorage<Data>('myJsonData') || defaultData;
};

export const saveData = (data: Data): void => {
    saveToStorage('myJsonData', data);
};

export const addItemToData = (data: Data): Data => {
    const newItem: Item = {
        id: data.items.length + 1,
        code: `C00${data.items.length + 1}`,
        description: `Sample description ${data.items.length + 1}`,
        recommendation: `Recommendation ${data.items.length + 1}`,
    };
    return {items: [...data.items, newItem]};
};