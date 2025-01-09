import React, {useState, useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Box,
    Pagination,
    Typography,
} from '@mui/material';
import {initializeData, saveData} from '../logic/dataManager';
import deprecations from '../deprecations.json';

type Row = {
    id: number;
    code: string;
    description: string;
    recommendation: string;
};

const DepTable = () => {
    const [rows, setRows] = useState<Row[]>(initializeData().items);
    const [newCode, setNewCode] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newRecommendation, setNewRecommendation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        saveData({items: rows});
    }, [rows]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (Array.isArray(json)) {
                        setRows(
                            json.map((item, index) => ({
                                id: item.id || index + 1,
                                code: item.code,
                                description: item.description,
                                recommendation: item.recommendation,
                            }))
                        );
                    } else {
                        alert('Invalid JSON format. Expected an array.');
                    }
                } catch (error) {
                    alert('Error parsing JSON file.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleAddRow = () => {
        if (!newCode || !newDescription || !newRecommendation) {
            alert('Please fill in all fields to add a new row.');
            return;
        }

        const newRow: Row = {
            id: rows.length > 0 ? rows[rows.length - 1].id + 1 : 1,
            code: newCode,
            description: newDescription,
            recommendation: newRecommendation,
        };
        setRows([...rows, newRow]);
        setNewCode('');
        setNewDescription('');
        setNewRecommendation('');
    };

    const handleDownloadTable = () => {
        const dataStr = JSON.stringify(rows, null, 2);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClearTable = () => {
        setRows([]);
    };

    const handleLoadDummyData = () => {
        const dummyRows = deprecations.deprecatedItems.map((item, idx) => ({
            id: idx + 1,
            code: item.code,
            description: item.description,
            recommendation: item.recommendation,
        }));
        setRows(dummyRows);
    };

    const paginatedRows = rows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <Box
            sx={{
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '30px',
                borderRadius: '10px',
                backgroundColor: '#282c34',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                color: '#abb2bf',
                fontFamily: "'Fira Code', monospace",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    color: '#61dafb',
                    fontFamily: "'Fira Code', monospace",
                }}
            >
                Deprecation Table
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    alignItems: 'center',
                    marginBottom: '30px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '15px',
                        alignItems: 'flex-start',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                            width: '50%',
                        }}
                    >
                        <TextField
                            label="Code"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                maxWidth: '450px',
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#3b4048',
                                    color: '#abb2bf',
                                },
                                '& .MuiInputLabel-root': {color: '#61dafb'},
                            }}
                            InputLabelProps={{
                                style: {color: '#61dafb'},
                            }}
                        />
                        <TextField
                            label="Description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                maxWidth: '450px',
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#3b4048',
                                    color: '#abb2bf',
                                },
                                '& .MuiInputLabel-root': {color: '#61dafb'},
                            }}
                        />
                        <TextField
                            label="Recommendation"
                            value={newRecommendation}
                            onChange={(e) => setNewRecommendation(e.target.value)}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                maxWidth: '450px',
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#3b4048',
                                    color: '#abb2bf',
                                },
                                '& .MuiInputLabel-root': {color: '#61dafb'},
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddRow}
                            sx={{
                                backgroundColor: '#61dafb',
                                color: '#282c34',
                                fontFamily: "'Fira Code', monospace",
                                '&:hover': {backgroundColor: '#4fa3d2'},
                                padding: '10px 20px',
                            }}
                        >
                            Add Row
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#1c1e22',
                            padding: '10px',
                            borderRadius: '5px',
                            fontFamily: "'Fira Code', monospace",
                            color: '#61dafb',
                            whiteSpace: 'pre-wrap',
                            width: '50%',
                            maxWidth: '450px',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#abb2bf',
                                fontFamily: "'Fira Code', monospace",
                                textAlign: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            Recommended JSON format:
                        </Typography>
                        {`[
    {
        "id": 1,
        "code": "C001",
        "description": "Sample description 1",
        "recommendation": "Recommendation 1"
    },
    {
        "id": 2,
        "code": "C002",
        "description": "Sample description 2",
        "recommendation": "Recommendation 2"
    }
]`}
                    </Box>
                </Box>
            </Box>
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    minWidth: '1000px',
                    maxHeight: '400px',
                    overflow: 'auto',
                    backgroundColor: '#1c1e22',
                    borderRadius: '10px',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#3b4048',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#61dafb',
                        borderRadius: '4px',
                    },
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {['ID', 'Code', 'Description', 'Recommendation'].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        backgroundColor: '#61dafb',
                                        color: '#282c34',
                                        fontWeight: 'bold',
                                        fontFamily: "'Fira Code', monospace",
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#3b4048',
                                    },
                                    '& .MuiTableCell-root': {
                                        borderBottom: '1px solid #61dafb',
                                    },
                                }}
                            >
                                <TableCell sx={{color: '#abb2bf'}}>{row.id}</TableCell>
                                <TableCell sx={{color: '#abb2bf'}}>{row.code}</TableCell>
                                <TableCell sx={{color: '#abb2bf'}}>{row.description}</TableCell>
                                <TableCell sx={{color: '#abb2bf'}}>{row.recommendation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(rows.length / rowsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                sx={{
                    margin: '20px 0',
                    '& .MuiPaginationItem-root': {
                        color: '#61dafb',
                        fontFamily: "'Fira Code', monospace",
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: '#61dafb',
                        color: '#282c34',
                    },
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    marginTop: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                    }}
                >
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: '#61dafb',
                            color: '#282c34',
                            fontFamily: "'Fira Code', monospace",
                            '&:hover': {backgroundColor: '#4fa3d2'},
                        }}
                    >
                        Upload JSON
                        <input type="file" accept="application/json" hidden onChange={handleFileUpload}/>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDownloadTable}
                        sx={{
                            backgroundColor: '#61dafb',
                            color: '#282c34',
                            fontFamily: "'Fira Code', monospace",
                            '&:hover': {backgroundColor: '#4fa3d2'},
                        }}
                    >
                        Download Current Table
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            fontFamily: "'Fira Code', monospace",
                        }}
                        onClick={handleClearTable}
                    >
                        Clear Current Table
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleLoadDummyData}
                        sx={{
                            backgroundColor: '#61dafb',
                            color: '#282c34',
                            fontFamily: "'Fira Code', monospace",
                            '&:hover': {backgroundColor: '#4fa3d2'},
                        }}
                    >
                        Load Dummy Data
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DepTable;